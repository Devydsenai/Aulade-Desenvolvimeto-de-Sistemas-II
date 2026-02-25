const { pool } = require('../config/db');

const STATUS_VALIDOS = ['EM_ANALISE', 'EM_EXECUCAO', 'PRONTO'];

async function listar(req, res) {
  try {
    const { status, moto_id } = req.query;
    let sql = `
      SELECT os.id, os.moto_id, os.descricao, os.status, os.valor_mao_obra, os.valor_total,
             os.aberto_em, os.finalizado_em,
             m.placa, m.marca, m.modelo,
             c.nome as cliente_nome,
             u_abertura.nome as aberto_por_nome,
             u_mecanico.nome as mecanico_nome
      FROM ordens_servico os
      INNER JOIN motos m ON m.id = os.moto_id
      INNER JOIN clientes c ON c.id = m.cliente_id
      INNER JOIN usuarios u_abertura ON u_abertura.id = os.aberto_por_id
      LEFT JOIN usuarios u_mecanico ON u_mecanico.id = os.mecanico_id
      WHERE 1=1
    `;
    const params = [];
    if (status) {
      sql += ' AND os.status = ?';
      params.push(status);
    }
    if (moto_id) {
      sql += ' AND os.moto_id = ?';
      params.push(moto_id);
    }
    sql += ' ORDER BY os.aberto_em DESC';
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Erro listar ordens:', err);
    res.status(500).json({ erro: 'Erro ao listar ordens' });
  }
}

async function criar(req, res) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { moto_id, descricao, mecanico_id } = req.body;
    const aberto_por_id = req.usuarioId;
    const [result] = await conn.execute(
      `INSERT INTO ordens_servico (moto_id, aberto_por_id, mecanico_id, descricao, status, valor_mao_obra, valor_total)
       VALUES (?, ?, ?, ?, 'EM_ANALISE', 0, 0)`,
      [moto_id, aberto_por_id, mecanico_id || null, descricao || null]
    );
    const ordemId = result.insertId;
    await conn.execute(
      'INSERT INTO ordem_status_historico (ordem_id, status, alterado_por_id) VALUES (?, ?, ?)',
      [ordemId, 'EM_ANALISE', aberto_por_id]
    );
    await conn.commit();
    res.status(201).json({
      id: ordemId,
      moto_id,
      status: 'EM_ANALISE',
      mensagem: 'Ordem de serviço aberta com sucesso'
    });
  } catch (err) {
    await conn.rollback();
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ erro: 'Moto ou mecânico não encontrado' });
    }
    console.error('Erro criar ordem:', err);
    res.status(500).json({ erro: 'Erro ao abrir ordem de serviço' });
  } finally {
    conn.release();
  }
}

async function obterPorId(req, res) {
  try {
    const { id } = req.params;
    const [ordens] = await pool.execute(
      `SELECT os.*, m.placa, m.marca, m.modelo, m.ano,
              c.id as cliente_id, c.nome as cliente_nome, c.telefone as cliente_telefone,
              u_abertura.nome as aberto_por_nome,
              u_mecanico.nome as mecanico_nome
       FROM ordens_servico os
       INNER JOIN motos m ON m.id = os.moto_id
       INNER JOIN clientes c ON c.id = m.cliente_id
       INNER JOIN usuarios u_abertura ON u_abertura.id = os.aberto_por_id
       LEFT JOIN usuarios u_mecanico ON u_mecanico.id = os.mecanico_id
       WHERE os.id = ?`,
      [id]
    );
    if (ordens.length === 0) {
      return res.status(404).json({ erro: 'Ordem não encontrada' });
    }
    const [pecas] = await pool.execute(
      `SELECT op.id, op.peca_id, op.quantidade, op.preco_unitario, op.valor_total, p.nome as peca_nome, p.sku
       FROM ordem_pecas op
       INNER JOIN pecas p ON p.id = op.peca_id
       WHERE op.ordem_id = ?`,
      [id]
    );
    const ordem = ordens[0];
    ordem.pecas = pecas;
    res.json(ordem);
  } catch (err) {
    console.error('Erro obter ordem:', err);
    res.status(500).json({ erro: 'Erro ao obter ordem' });
  }
}

async function atualizarStatus(req, res) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id } = req.params;
    const { status } = req.body;
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }
    const alterado_por_id = req.usuarioId;
    let finalizado_em = null;
    if (status === 'PRONTO') {
      finalizado_em = new Date();
    }
    const [result] = await conn.execute(
      'UPDATE ordens_servico SET status = ?, finalizado_em = COALESCE(?, finalizado_em) WHERE id = ?',
      [status, finalizado_em, id]
    );
    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ erro: 'Ordem não encontrada' });
    }
    await conn.execute(
      'INSERT INTO ordem_status_historico (ordem_id, status, alterado_por_id) VALUES (?, ?, ?)',
      [id, status, alterado_por_id]
    );
    await conn.commit();
    res.json({ mensagem: 'Status atualizado', status });
  } catch (err) {
    await conn.rollback();
    console.error('Erro atualizar status:', err);
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  } finally {
    conn.release();
  }
}

async function atualizarValorMaoObra(req, res) {
  try {
    const { id } = req.params;
    const { valor_mao_obra } = req.body;
    const valor = Number(valor_mao_obra) || 0;
    if (valor < 0) {
      return res.status(400).json({ erro: 'Valor inválido' });
    }
    const [pecas] = await pool.execute(
      'SELECT COALESCE(SUM(valor_total), 0) as total_pecas FROM ordem_pecas WHERE ordem_id = ?',
      [id]
    );
    const totalPecas = Number(pecas[0]?.total_pecas || 0);
    const valorTotal = totalPecas + valor;
    const [result] = await pool.execute(
      'UPDATE ordens_servico SET valor_mao_obra = ?, valor_total = ? WHERE id = ?',
      [valor, valorTotal, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Ordem não encontrada' });
    }
    res.json({ mensagem: 'Valor atualizado', valor_mao_obra: valor, valor_total: valorTotal });
  } catch (err) {
    console.error('Erro atualizar mão de obra:', err);
    res.status(500).json({ erro: 'Erro ao atualizar valor' });
  }
}

async function adicionarPeca(req, res) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id } = req.params;
    const { peca_id, quantidade } = req.body;
    const qtd = Math.max(1, Number(quantidade) || 1);
    const [pecaRows] = await conn.execute(
      'SELECT id, nome, preco_unitario, estoque FROM pecas WHERE id = ?',
      [peca_id]
    );
    if (pecaRows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ erro: 'Peça não encontrada' });
    }
    const peca = pecaRows[0];
    if (peca.estoque < qtd) {
      await conn.rollback();
      return res.status(400).json({ erro: `Estoque insuficiente. Disponível: ${peca.estoque}` });
    }
    const precoUnit = Number(peca.preco_unitario);
    const valorTotal = precoUnit * qtd;
    await conn.execute(
      'INSERT INTO ordem_pecas (ordem_id, peca_id, quantidade, preco_unitario, valor_total) VALUES (?, ?, ?, ?, ?)',
      [id, peca_id, qtd, precoUnit, valorTotal]
    );
    await conn.execute('UPDATE pecas SET estoque = estoque - ? WHERE id = ?', [qtd, peca_id]);
    const [totais] = await conn.execute(
      `SELECT os.valor_mao_obra, COALESCE(SUM(op.valor_total), 0) as total_pecas FROM ordens_servico os LEFT JOIN ordem_pecas op ON op.ordem_id = os.id WHERE os.id = ? GROUP BY os.id, os.valor_mao_obra`,
      [id]
    );
    const totalPecas = Number(totais[0]?.total_pecas || 0);
    const valorMaoObra = Number(totais[0]?.valor_mao_obra || 0);
    const valorTotalOrdem = totalPecas + valorMaoObra;
    await conn.execute('UPDATE ordens_servico SET valor_total = ? WHERE id = ?', [valorTotalOrdem, id]);
    await conn.commit();
    res.status(201).json({
      mensagem: 'Peça adicionada',
      quantidade: qtd,
      valor_total_peca: valorTotal,
      valor_total_ordem: valorTotalOrdem
    });
  } catch (err) {
    await conn.rollback();
    console.error('Erro adicionar peça:', err);
    res.status(500).json({ erro: 'Erro ao adicionar peça' });
  } finally {
    conn.release();
  }
}

async function removerPeca(req, res) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id, ordemPecaId } = req.params;
    const [linhas] = await conn.execute(
      'SELECT op.id, op.peca_id, op.quantidade, op.valor_total FROM ordem_pecas op WHERE op.ordem_id = ? AND op.id = ?',
      [id, ordemPecaId]
    );
    if (linhas.length === 0) {
      await conn.rollback();
      return res.status(404).json({ erro: 'Item não encontrado na ordem' });
    }
    const item = linhas[0];
    await conn.execute('DELETE FROM ordem_pecas WHERE id = ?', [ordemPecaId]);
    await conn.execute('UPDATE pecas SET estoque = estoque + ? WHERE id = ?', [item.quantidade, item.peca_id]);
    const [totais] = await conn.execute(
      `SELECT os.valor_mao_obra, COALESCE(SUM(op.valor_total), 0) as total_pecas FROM ordens_servico os LEFT JOIN ordem_pecas op ON op.ordem_id = os.id WHERE os.id = ? GROUP BY os.id, os.valor_mao_obra`,
      [id]
    );
    const totalPecas = Number(totais[0]?.total_pecas || 0);
    const valorMaoObra = Number(totais[0]?.valor_mao_obra || 0);
    const valorTotalOrdem = totalPecas + valorMaoObra;
    await conn.execute('UPDATE ordens_servico SET valor_total = ? WHERE id = ?', [valorTotalOrdem, id]);
    await conn.commit();
    res.json({ mensagem: 'Peça removida', valor_total_ordem: valorTotalOrdem });
  } catch (err) {
    await conn.rollback();
    console.error('Erro remover peça:', err);
    res.status(500).json({ erro: 'Erro ao remover peça' });
  } finally {
    conn.release();
  }
}

async function historicoStatus(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      `SELECT osh.id, osh.status, osh.alterado_em, u.nome as alterado_por
       FROM ordem_status_historico osh
       LEFT JOIN usuarios u ON u.id = osh.alterado_por_id
       WHERE osh.ordem_id = ?
       ORDER BY osh.alterado_em ASC`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro histórico status:', err);
    res.status(500).json({ erro: 'Erro ao obter histórico' });
  }
}

module.exports = {
  listar,
  criar,
  obterPorId,
  atualizarStatus,
  atualizarValorMaoObra,
  adicionarPeca,
  removerPeca,
  historicoStatus
};

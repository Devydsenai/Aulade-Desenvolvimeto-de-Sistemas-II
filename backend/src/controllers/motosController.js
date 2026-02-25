const { pool } = require('../config/db');

async function listar(req, res) {
  try {
    const { cliente_id } = req.query;
    let sql = `
      SELECT m.id, m.cliente_id, m.placa, m.marca, m.modelo, m.ano, m.chassi, m.criado_em,
             c.nome as cliente_nome, c.telefone as cliente_telefone
      FROM motos m
      INNER JOIN clientes c ON c.id = m.cliente_id
      WHERE 1=1
    `;
    const params = [];
    if (cliente_id) {
      sql += ' AND m.cliente_id = ?';
      params.push(cliente_id);
    }
    sql += ' ORDER BY m.placa';
    const [rows] = await pool.execute(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Erro listar motos:', err);
    res.status(500).json({ erro: 'Erro ao listar motos' });
  }
}

async function criar(req, res) {
  try {
    const { cliente_id, placa, marca, modelo, ano, chassi } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO motos (cliente_id, placa, marca, modelo, ano, chassi) VALUES (?, ?, ?, ?, ?, ?)',
      [cliente_id, placa, marca || null, modelo || null, ano || null, chassi || null]
    );
    res.status(201).json({
      id: result.insertId,
      cliente_id,
      placa,
      marca,
      modelo,
      ano,
      chassi,
      mensagem: 'Moto cadastrada com sucesso'
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'Placa já cadastrada' });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ erro: 'Cliente não encontrado' });
    }
    console.error('Erro criar moto:', err);
    res.status(500).json({ erro: 'Erro ao cadastrar moto' });
  }
}

async function obterPorId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      `SELECT m.id, m.cliente_id, m.placa, m.marca, m.modelo, m.ano, m.chassi, m.criado_em,
              c.nome as cliente_nome, c.cpf as cliente_cpf, c.telefone as cliente_telefone, c.email as cliente_email
       FROM motos m
       INNER JOIN clientes c ON c.id = m.cliente_id
       WHERE m.id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Moto não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro obter moto:', err);
    res.status(500).json({ erro: 'Erro ao obter moto' });
  }
}

async function historicoServicos(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      `SELECT os.id, os.descricao, os.status, os.valor_total, os.aberto_em, os.finalizado_em,
              u.nome as mecanico_nome
       FROM ordens_servico os
       LEFT JOIN usuarios u ON u.id = os.mecanico_id
       WHERE os.moto_id = ?
       ORDER BY os.aberto_em DESC`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro histórico moto:', err);
    res.status(500).json({ erro: 'Erro ao obter histórico' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { cliente_id, placa, marca, modelo, ano, chassi } = req.body;
    const [result] = await pool.execute(
      `UPDATE motos SET cliente_id = COALESCE(?, cliente_id), placa = COALESCE(?, placa),
       marca = COALESCE(?, marca), modelo = COALESCE(?, modelo), ano = COALESCE(?, ano), chassi = COALESCE(?, chassi)
       WHERE id = ?`,
      [cliente_id, placa, marca, modelo, ano, chassi, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Moto não encontrada' });
    }
    res.json({ mensagem: 'Moto atualizada com sucesso' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'Placa já cadastrada' });
    }
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ erro: 'Cliente não encontrado' });
    }
    console.error('Erro atualizar moto:', err);
    res.status(500).json({ erro: 'Erro ao atualizar moto' });
  }
}

async function excluir(req, res) {
  try {
    const [result] = await pool.execute('DELETE FROM motos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Moto não encontrada' });
    }
    res.json({ mensagem: 'Moto excluída com sucesso' });
  } catch (err) {
    console.error('Erro excluir moto:', err);
    res.status(500).json({ erro: 'Erro ao excluir moto' });
  }
}

module.exports = { listar, criar, obterPorId, historicoServicos, atualizar, excluir };

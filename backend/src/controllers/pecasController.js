const { pool } = require('../config/db');

async function listar(req, res) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, nome, sku, preco_unitario, estoque, criado_em FROM pecas ORDER BY nome'
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro listar peças:', err);
    res.status(500).json({ erro: 'Erro ao listar peças' });
  }
}

async function criar(req, res) {
  try {
    const { nome, sku, preco_unitario, estoque } = req.body;
    const preco = Number(preco_unitario) || 0;
    const qtdEstoque = Number(estoque) || 0;
    const [result] = await pool.execute(
      'INSERT INTO pecas (nome, sku, preco_unitario, estoque) VALUES (?, ?, ?, ?)',
      [nome, sku || null, preco, qtdEstoque]
    );
    res.status(201).json({
      id: result.insertId,
      nome,
      sku,
      preco_unitario: preco,
      estoque: qtdEstoque,
      mensagem: 'Peça cadastrada com sucesso'
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'SKU já cadastrado' });
    }
    console.error('Erro criar peça:', err);
    res.status(500).json({ erro: 'Erro ao cadastrar peça' });
  }
}

async function obterPorId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT id, nome, sku, preco_unitario, estoque, criado_em FROM pecas WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Peça não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro obter peça:', err);
    res.status(500).json({ erro: 'Erro ao obter peça' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, sku, preco_unitario, estoque } = req.body;
    const [result] = await pool.execute(
      `UPDATE pecas SET 
        nome = COALESCE(?, nome), 
        sku = COALESCE(?, sku), 
        preco_unitario = COALESCE(?, preco_unitario), 
        estoque = COALESCE(?, estoque) 
       WHERE id = ?`,
      [nome, sku, preco_unitario, estoque, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Peça não encontrada' });
    }
    res.json({ mensagem: 'Peça atualizada com sucesso' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'SKU já cadastrado' });
    }
    console.error('Erro atualizar peça:', err);
    res.status(500).json({ erro: 'Erro ao atualizar peça' });
  }
}

async function excluir(req, res) {
  try {
    const [result] = await pool.execute('DELETE FROM pecas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Peça não encontrada' });
    }
    res.json({ mensagem: 'Peça excluída com sucesso' });
  } catch (err) {
    console.error('Erro excluir peça:', err);
    res.status(500).json({ erro: 'Erro ao excluir peça' });
  }
}

module.exports = { listar, criar, obterPorId, atualizar, excluir };

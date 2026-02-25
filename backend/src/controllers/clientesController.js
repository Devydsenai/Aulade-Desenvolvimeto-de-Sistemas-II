const { pool } = require('../config/db');

async function listar(req, res) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, nome, cpf, telefone, email, endereco, criado_em FROM clientes ORDER BY nome'
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro listar clientes:', err);
    res.status(500).json({ erro: 'Erro ao listar clientes' });
  }
}

async function criar(req, res) {
  try {
    const { nome, cpf, telefone, email, endereco } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO clientes (nome, cpf, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)',
      [nome || null, cpf || null, telefone || null, email || null, endereco || null]
    );
    res.status(201).json({
      id: result.insertId,
      nome,
      cpf,
      telefone,
      email,
      endereco,
      mensagem: 'Cliente cadastrado com sucesso'
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'CPF já cadastrado' });
    }
    console.error('Erro criar cliente:', err);
    res.status(500).json({ erro: 'Erro ao cadastrar cliente' });
  }
}

async function obterPorId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT id, nome, cpf, telefone, email, endereco, criado_em FROM clientes WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro obter cliente:', err);
    res.status(500).json({ erro: 'Erro ao obter cliente' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, endereco } = req.body;
    const [result] = await pool.execute(
      `UPDATE clientes SET nome = COALESCE(?, nome), cpf = COALESCE(?, cpf), 
       telefone = COALESCE(?, telefone), email = COALESCE(?, email), endereco = COALESCE(?, endereco) 
       WHERE id = ?`,
      [nome, cpf, telefone, email, endereco, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json({ mensagem: 'Cliente atualizado com sucesso' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'CPF já cadastrado' });
    }
    console.error('Erro atualizar cliente:', err);
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
}

async function excluir(req, res) {
  try {
    const [result] = await pool.execute('DELETE FROM clientes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json({ mensagem: 'Cliente excluído com sucesso' });
  } catch (err) {
    console.error('Erro excluir cliente:', err);
    res.status(500).json({ erro: 'Erro ao excluir cliente' });
  }
}

module.exports = { listar, criar, obterPorId, atualizar, excluir };

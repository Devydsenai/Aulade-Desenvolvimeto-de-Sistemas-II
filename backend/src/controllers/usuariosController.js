const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

async function listar(req, res) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, nome, email, perfil, ativo, criado_em FROM usuarios ORDER BY nome'
    );
    res.json(rows);
  } catch (err) {
    console.error('Erro listar usuários:', err);
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
}

async function criar(req, res) {
  try {
    const { nome, email, senha, perfil } = req.body;
    const perfilValido = perfil || 'PROPRIETARIO';
    if (!['ATENDENTE', 'MECANICO', 'PROPRIETARIO'].includes(perfilValido)) {
      return res.status(400).json({ erro: 'Perfil inválido. Use: ATENDENTE, MECANICO ou PROPRIETARIO' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, perfilValido]
    );
    res.status(201).json({
      id: result.insertId,
      nome,
      email,
      perfil: perfilValido,
      mensagem: 'Usuário criado com sucesso'
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }
    console.error('Erro criar usuário:', err);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

async function obterPorId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT id, nome, email, perfil, ativo, criado_em FROM usuarios WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro obter usuário:', err);
    res.status(500).json({ erro: 'Erro ao obter usuário' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, senha, perfil, ativo } = req.body;
    let senhaHash = null;
    if (senha !== undefined && senha !== '') {
      senhaHash = await bcrypt.hash(senha, 10);
    }
    const [result] = await pool.execute(
      `UPDATE usuarios SET 
        nome = COALESCE(?, nome), 
        email = COALESCE(?, email), 
        senha_hash = COALESCE(?, senha_hash), 
        perfil = COALESCE(?, perfil), 
        ativo = COALESCE(?, ativo) 
       WHERE id = ?`,
      [nome, email, senhaHash, perfil, ativo, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }
    console.error('Erro atualizar usuário:', err);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
}

async function excluir(req, res) {
  try {
    const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json({ mensagem: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Erro excluir usuário:', err);
    res.status(500).json({ erro: 'Erro ao excluir usuário' });
  }
}

module.exports = { listar, criar, obterPorId, atualizar, excluir };

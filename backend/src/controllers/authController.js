const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '1h';

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const [rows] = await pool.execute(
      'SELECT id, nome, email, senha_hash, perfil, ativo FROM usuarios WHERE email = ?',
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }
    const usuario = rows[0];
    if (!usuario.ativo) {
      return res.status(401).json({ erro: 'Usuário inativo' });
    }
    const senhaOk = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaOk) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos' });
    }
    const token = jwt.sign(
      { sub: usuario.id, perfil: usuario.perfil },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );
    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });
  } catch (err) {
    console.error('Erro login:', err);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
}

async function registrar(req, res) {
  try {
    const { nome, email, senha, perfil } = req.body;
    const perfilValido = perfil || 'PROPRIETARIO';
    if (!['ATENDENTE', 'MECANICO', 'PROPRIETARIO'].includes(perfilValido)) {
      return res.status(400).json({ erro: 'Perfil inválido' });
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha_hash, perfil) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, perfilValido]
    );
    const token = jwt.sign(
      { sub: result.insertId, perfil: perfilValido },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );
    res.status(201).json({
      mensagem: 'Conta criada com sucesso',
      token,
      usuario: {
        id: result.insertId,
        nome,
        email,
        perfil: perfilValido
      }
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }
    console.error('Erro registrar:', err);
    res.status(500).json({ erro: 'Erro ao criar conta' });
  }
}

module.exports = { login, registrar };

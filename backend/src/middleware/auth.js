const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const PERFIS = ['ATENDENTE', 'MECANICO', 'PROPRIETARIO'];

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não informado' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuarioId = decoded.sub;
    req.usuarioPerfil = decoded.perfil;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

function requirePerfil(...perfisPermitidos) {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuarioPerfil)) {
      return res.status(403).json({ erro: 'Acesso negado para este perfil' });
    }
    next();
  };
}

// Alias para compatibilidade com rotas que usam auth
const auth = authMiddleware;

module.exports = { auth, authMiddleware, requirePerfil, PERFIS };

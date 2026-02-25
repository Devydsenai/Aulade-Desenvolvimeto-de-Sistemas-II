const express = require('express');
const { body } = require('express-validator');
const {
  listar,
  criar,
  obterPorId,
  atualizar,
  excluir
} = require('../controllers/usuariosController');
const { authMiddleware, requirePerfil } = require('../middleware/auth');
const { validarCampos } = require('../middleware/validacao');

const router = express.Router();

router.use(authMiddleware);
router.use(requirePerfil('ATENDENTE', 'MECANICO'));

router.get('/', listar);
router.get('/:id', obterPorId);
router.post('/',
  body('nome').trim().notEmpty().withMessage('Nome obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha com mínimo 6 caracteres'),
  body('perfil').isIn(['ATENDENTE', 'MECANICO', 'PROPRIETARIO']).withMessage('Perfil inválido'),
  validarCampos,
  criar
);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

module.exports = router;

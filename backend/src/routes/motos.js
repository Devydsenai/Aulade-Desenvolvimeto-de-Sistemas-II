const express = require('express');
const { body } = require('express-validator');
const {
  listar,
  criar,
  obterPorId,
  historicoServicos,
  atualizar,
  excluir
} = require('../controllers/motosController');
const { authMiddleware, requirePerfil } = require('../middleware/auth');
const { validarCampos } = require('../middleware/validacao');

const router = express.Router();

router.use(authMiddleware);
router.use(requirePerfil('ATENDENTE', 'MECANICO', 'PROPRIETARIO'));

router.get('/', listar);
router.get('/:id/historico', historicoServicos);
router.get('/:id', obterPorId);
router.post('/',
  body('cliente_id').isInt({ min: 1 }).withMessage('Cliente obrigatório'),
  body('placa').trim().notEmpty().withMessage('Placa obrigatória'),
  validarCampos,
  criar
);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

module.exports = router;

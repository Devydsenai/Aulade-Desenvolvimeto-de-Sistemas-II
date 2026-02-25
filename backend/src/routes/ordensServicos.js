const express = require('express');
const { body } = require('express-validator');
const {
  listar,
  criar,
  obterPorId,
  atualizarStatus,
  atualizarValorMaoObra,
  adicionarPeca,
  removerPeca,
  historicoStatus
} = require('../controllers/ordensController');
const { authMiddleware, requirePerfil } = require('../middleware/auth');
const { validarCampos } = require('../middleware/validacao');

const router = express.Router();

router.use(authMiddleware);
router.use(requirePerfil('ATENDENTE', 'MECANICO', 'PROPRIETARIO'));

router.get('/', listar);
router.get('/:id/historico-status', historicoStatus);
router.get('/:id', obterPorId);
router.post('/',
  body('moto_id').isInt({ min: 1 }).withMessage('Moto obrigat?ria'),
  validarCampos,
  criar
);
router.patch('/:id/status',
  body('status').isIn(['EM_ANALISE', 'EM_EXECUCAO', 'PRONTO']).withMessage('Status inv?lido'),
  validarCampos,
  atualizarStatus
);
router.patch('/:id/mao-de-obra',
  body('valor_mao_obra').isFloat({ min: 0 }).withMessage('Valor inv?lido'),
  validarCampos,
  atualizarValorMaoObra
);
router.post('/:id/pecas',
  body('peca_id').isInt({ min: 1 }).withMessage('Pe?a obrigat?ria'),
  body('quantidade').optional().isInt({ min: 1 }).withMessage('Quantidade inv?lida'),
  validarCampos,
  adicionarPeca
);
router.delete('/:id/pecas/:ordemPecaId', removerPeca);

module.exports = router;

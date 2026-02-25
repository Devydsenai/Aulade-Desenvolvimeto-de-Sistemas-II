const express = require('express');
const { body } = require('express-validator');
const { login, registrar } = require('../controllers/authController');
const { validarCampos } = require('../middleware/validacao');

const router = express.Router();

router.post('/login',
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').notEmpty().withMessage('Senha obrigatória'),
  validarCampos,
  login
);

router.post('/registrar',
  body('nome').trim().notEmpty().withMessage('Nome obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha com mínimo 6 caracteres'),
  body('perfil').optional().isIn(['ATENDENTE', 'MECANICO', 'PROPRIETARIO']).withMessage('Perfil inválido'),
  validarCampos,
  registrar
);

module.exports = router;

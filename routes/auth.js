const { Router } = require('express');
const { check } = require("express-validator");
const { login, googleSignIn } = require('../controllers/login');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
], login)

router.post(
  "/google",
  [
    check("id_token", "id_token es necesario").notEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;

const user = require("../../controllers/Usuarios/user.controller.js");

var router = require("express").Router();
const { body } = require('express-validator');
const { validar } = require("../../utils/validation");

router.post("/signup", [
    body('nome')
        .notEmpty().withMessage("O campo nome é obrigatório")
        .isAlpha().withMessage('O campo nome é uma string!'),
    body('email')
        .isEmail().withMessage('Email Inválido!')
        .isLength({ max: 150 }).withMessage('Número de caracteres excedido! Maximo: 150.'),
    body('senha')
        .isLength({ min: 6, max: 150 }).withMessage('Número minino de caracteres é 6! Maximo: 150.')
        .matches(/\d/).withMessage('A senha precisa ter número!')
], validar, user.create);

router.get("/login", [
    body('email')
        .isEmail().withMessage('Email Inválido!')
        .isLength({ max: 150 }).withMessage('Número de caracteres excedido! Maximo: 150.'),
    body('senha')
        .isLength({ min: 6, max: 150 }).withMessage('Número minino de caracteres é 6! Maximo: 150.')
        .matches(/\d/).withMessage('A senha precisa ter número!')
], validar, user.login);

router.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
})
module.exports = router;
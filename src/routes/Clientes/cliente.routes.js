const cliente = require("../../controllers/Clientes/cliente.controller.js");

var router = require("express").Router();

const { body } = require('express-validator');
const { validar, validarCpf } = require("../../utils/validation");


router.post("/store", [
    body('nome')
        .notEmpty().withMessage("O campo nome é obrigatório")
        .isAlpha().withMessage('O campo nome é uma string!')
        .isLength({ max: 50 }).withMessage('Número de caracteres excedido! Maximo: 50.'),
    body('cpf')
        .isInt().withMessage('Cpf é somente número!')
        .isLength({ min: 11, max: 11 }).withMessage('Campo cpf aceita apenas 11 números!'),
    body('data_nascimento')
        .isInt().withMessage('Data de nascimento é somente número!')
        .isLength(8).withMessage('Data inválida! Formato válido YYYYmmdd'),
    body('email')
        .isEmail().withMessage('Email Inválido!')
        .isLength({ max: 150 }).withMessage('Número de caracteres excedido! Maximo: 150.'),
    body('telefone')
        .isLength({ min: 10, max: 20 }).withMessage('Número de telefone inválido! Tamanho minimo de 10 caracteres.'),
    body('cep')
        .notEmpty().withMessage('Campo CEP é obrigatório!')
        .isInt().withMessage('CEP é somente numero!')
        .isLength({ max: 11 }).withMessage('Número de caracteres excedido! Maximo: 11.'),
    body('estado')
        .notEmpty().withMessage('Campo State é obrigatório!')
        .isAlpha().withMessage('Campo State é uma string!'),
    body('cidade')
        .notEmpty().withMessage('Campo City é obrigatório!')
        .isAlpha().withMessage('Campo City é uma string!'),
    body('bairro').optional()
        .notEmpty().withMessage('Campo District é obrigatório!')
        .isAlpha().withMessage('Campo District é uma string!'),
    body('logradouro').optional()
        .notEmpty().withMessage('Campo street é obrigatório!')
        .isAlpha().withMessage('Campo street é uma string!'),
    body('numero').optional()
        .notEmpty().withMessage('Campo number é obrigatório!')
        .isInt().withMessage('Campo number é somente número!')
        .isLength({ max: 11 }).withMessage('Número de caracteres excedido! Maximo: 11.'),
], validar, validarCpf, cliente.create);

router.get("/show/:id", [
    body('ano').optional()
        .notEmpty().withMessage("O campo ano é obrigatório")
        .isInt().withMessage('O campo ano é numerico!')
        .isLength(4).withMessage('Campo ano tem tamanho 4'),
    body('mes').optional()
        .notEmpty().withMessage("O campo mes é obrigatório")
        .isInt().withMessage('O campo mes é numerico!')
        .isLength(2).withMessage('Campo mes tem tamanho 2')

], validar, cliente.show);

router.get("/index", cliente.index);

router.put("/update/:id", [
    body('nome').optional()
        .notEmpty().withMessage("O campo name é obrigatório")
        .isAlpha().withMessage('O campo name é uma string!')
        .isLength({ max: 50 }).withMessage('Número de caracteres excedido! Maximo: 50.'),
    body('cpf').optional()
        .isInt().withMessage('Cpf é somente número!')
        .isLength({ min: 11, max: 11 }).withMessage('Campo cpf aceita apenas 11 números!'),
    body('email').optional()
        .isEmail().withMessage('Email Inválido!')
        .isLength({ max: 150 }).withMessage('Número de caracteres excedido! Maximo: 150.'),
    body('telefone').optional()
        .isLength({ min: 10, max: 20 }).withMessage('Número de telefone inválido! Tamanho mínimo de 10 caracteres.'),
    body('cep').optional()
        .notEmpty().withMessage('Campo CEP é obrigatório!')
        .isInt().withMessage('CEP é somente números!')
        .isLength({ max: 11 }).withMessage('Número de caracteres excedido! Maximo: 11.'),
    body('estado').optional()
        .notEmpty().withMessage('Campo State é obrigatório!')
        .isAlpha().withMessage('Campo State é uma string!'),
    body('cidade').optional()
        .notEmpty().withMessage('Campo City é obrigatório!')
        .isAlpha().withMessage('Campo City é uma string!'),
    body('bairro').optional()
        .notEmpty().withMessage('Campo District é obrigatório!')
        .isAlpha().withMessage('Campo District é uma string!'),
    body('logradouro').optional()
        .notEmpty().withMessage('Campo street é obrigatório!')
        .isAlpha().withMessage('Campo street é uma string!'),
    body('numero').optional()
        .notEmpty().withMessage('Campo number é obrigatório!')
        .isInt().withMessage('Campo number é um número!')
        .isLength({ max: 11 }).withMessage('Número de caracteres excedido! Maximo: 11.')
], validar, validarCpf, cliente.update);

router.delete("/delete/:id", cliente.delete);



module.exports = router;
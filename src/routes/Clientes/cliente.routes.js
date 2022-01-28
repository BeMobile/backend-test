const cliente = require("../../controllers/Clientes/cliente.controller.js");

var router = require("express").Router();

const { body } = require('express-validator');
const { validar, validarCpf } = require("../../utils/validation");


router.post("/store", [
    body('nome')
        .notEmpty().withMessage("O campo nome é obrigatório")
        .isAlpha().withMessage('O campo nome é uma string!'),
    body('cpf')
        .isInt().withMessage('Cpf é somente número!')
        .isLength({ min: 11 }).withMessage('Cpf inválido!'),
    body('data_nascimento')
        .isInt().withMessage('Data de nascimento é somente número!')
        .isLength({ min: 8 }).withMessage('Data inválido!'),
    body('email')
        .isEmail().withMessage('Email Inválido!'),
    body('telefone')
        .isLength({ min: 11 }).withMessage('Número de telefone inválido!'),
    body('cep')
        .notEmpty().withMessage('Campo CEP é obrigatório!')
        .isInt().withMessage('CEP Inválido!'),
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
        .isInt().withMessage('Campo number é um número!')
], validarCpf, validar, cliente.create);

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
        .isAlpha().withMessage('O campo name é uma string!'),
    body('cpf').optional()
        .isInt().withMessage('Cpf é somente número!')
        .isLength({ min: 11 }).withMessage('Cpf inválido!'),
    body('email').optional()
        .isEmail().withMessage('Email Inválido!'),
    body('telefone').optional()
        .isLength({ min: 11 }).withMessage('Número de telefone inválido!'),
    body('cep').optional()
        .notEmpty().withMessage('Campo CEP é obrigatório!')
        .isInt().withMessage('CEP Inválido!'),
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
], validarCpf, validar, cliente.update);

router.delete("/delete/:id", cliente.delete);



module.exports = router;
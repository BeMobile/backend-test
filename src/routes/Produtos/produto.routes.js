const produto = require("../../controllers/Produtos/produto.controller.js");

var router = require("express").Router();
const { body } = require('express-validator');
const { validar } = require("../../utils/validation");

router.post("/store", [
    body('cod_produto')
        .notEmpty().withMessage("O campo cod_produto é obrigatório")
        .isString().withMessage('O campo cod_produto é uma string!'),
    body('titulo')
        .notEmpty().withMessage('Campo titulo é obrigatório!')
        .isString().withMessage('Campo titulo é uma string!'),
    body('subtitulo').optional()
        .notEmpty().withMessage('Campo subtitulo é obrigatório!')
        .isString().withMessage('Campo subtitulo é uma string!'),
    body('autor')
        .notEmpty().withMessage('Campo autor é obrigatório!')
        .isString().withMessage('Campo autor é uma string!'),
    body('editora')
        .notEmpty().withMessage('Campo editora é obrigatório!')
        .isString().withMessage('Campo editora é uma string!'),
    body('edicao').optional()
        .notEmpty().withMessage('Campo edicao é obrigatório!')
        .isString().withMessage('Campo edicao é uma string!'),
    body('ano_edicao').optional()
        .notEmpty().withMessage('Campo ano_edicao é obrigatório!')
        .isInt().withMessage('Campo ano_edicao é um número!')
        .isLength({ max: 10 }).withMessage('Número de telefone inválido!'),
    body('preco')
        .notEmpty().withMessage('Campo preco é obrigatório!')
        .isNumeric().withMessage('Campo preco é numerico!'),
    body('ativo')
        .notEmpty().withMessage('Campo ativo é obrigatório!')
        .isInt().withMessage('Campo ativo é um número!')

], validar, produto.create);

router.get("/show/:id", produto.show);

router.get("/index", produto.index);

router.put("/update/:id", [
    body('cod_produto')
        .notEmpty().withMessage("O campo cod_produto é obrigatório")
        .isString().withMessage('O campo cod_produto é uma string!'),
    body('titulo').optional()
        .notEmpty().withMessage('Campo titulo é obrigatório!')
        .isString().withMessage('Campo titulo é uma string!'),
    body('subtitulo').optional()
        .notEmpty().withMessage('Campo subtitulo é obrigatório!')
        .isString().withMessage('Campo subtitulo é uma string!'),
    body('autor').optional()
        .notEmpty().withMessage('Campo autor é obrigatório!')
        .isString().withMessage('Campo autor é uma string!'),
    body('editora').optional()
        .notEmpty().withMessage('Campo editora é obrigatório!')
        .isString().withMessage('Campo editora é uma string!'),
    body('edicao').optional()
        .notEmpty().withMessage('Campo edicao é obrigatório!')
        .isString().withMessage('Campo edicao é uma string!'),
    body('ano_edicao').optional()
        .notEmpty().withMessage('Campo ano_edicao é obrigatório!')
        .isInt().withMessage('Campo ano_edicao é um número!')
        .isLength({ max: 10 }).withMessage('Número de telefone inválido!'),
    body('preco').optional()
        .notEmpty().withMessage('Campo preco é obrigatório!')
        .isNumeric().withMessage('Campo preco é numerico!'),
    body('ativo').optional()
        .notEmpty().withMessage('Campo ativo é obrigatório!')
        .isInt().withMessage('Campo ativo é um número!')

], validar,  produto.update);

router.delete("/delete/:id", produto.delete);



module.exports = router;
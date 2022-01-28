const venda = require("../../controllers/Vendas/venda.controller.js");

var router = require("express").Router();
const { body } = require('express-validator');
const { validar } = require("../../utils/validation");

router.post("/store", [
    body('id_cliente')
        .notEmpty().withMessage("O campo id_cliente é obrigatório")
        .isInt().withMessage('O campo id_cliente é um número!'),
    body('id_produto')
        .notEmpty().withMessage("O campo id_produto é obrigatório")
        .isInt().withMessage('O campo id_produto é um número!'),
    body('quantidade')
        .notEmpty().withMessage("O campo quantidade é obrigatório")
        .isInt().withMessage('O campo quantidade é um número!'),
    body('preco_unit')
        .notEmpty().withMessage("O campo preco_unit é obrigatório")
        .isNumeric().withMessage('O campo preco_unit é um número!')
], validar, venda.create);


module.exports = router;
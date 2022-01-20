const venda = require("../../controllers/Vendas/venda.controller.js");

var router = require("express").Router();

router.post("/store", venda.create);


module.exports = router;
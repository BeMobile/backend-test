const produto = require("../../controllers/Produtos/produto.controller.js");

var router = require("express").Router();

router.post("/store", produto.create);

router.get("/show/:id", produto.show);

router.get("/index", produto.index);

router.put("/update/:id", produto.update);

router.delete("/delete/:id", produto.delete);



module.exports = router;
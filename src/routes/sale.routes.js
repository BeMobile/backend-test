const router = require("express").Router();

const saleModel = require("../models/sale.model");
const productModel = require("../models/product.model");

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ===========================================================
//         rota de criação de venda
// - vendas:
//       - registrar venda de 1 produto a 1 cliente (store)
// ===========================================================
router.post(
  "/add/store",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { qtt, productId } = req.body;

      const product = await productModel.findOne({ where: { id: 7 } });
      console.log(product);

      const unitPrice = parseFloat(product.price);
      const totalPrice = product.price * qtt;

      const result = await saleModel.create({
        ...req.body,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        qtt: qtt,
      });
      return res.status(200).json({
        error: false,
        msg: "Sale registered successfully!",
        body: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: true,
        msg: "Product not registered successfully!",
      });
    }
  }
);

module.exports = router;

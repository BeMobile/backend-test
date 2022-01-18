const router = require("express").Router();

const SaleModel = require("../models/sale.model");
const ClientModel = require("../models/client.model");
const ProductModel = require("../models/product.model");

const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ===========================================================
//         rota de criação de venda
//    - vendas:
//       - registrar venda de 1 produto a 1 cliente (store)
// ===========================================================
router.post(
  "/sales",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { qtt, clientId, productId } = req.body;

      const product = await ProductModel.findOne({
        where: { id: productId },
      });

      const client = await ClientModel.findOne({
        where: { id: clientId },
      });

      if (!product) {
        return res.status(404).json({ msg: "Product not found!" });
      }

      if (!client) {
        return res.status(404).json({ msg: "Client not found!" });
      }

      const price = parseFloat(product.price);
      const totalPrice = price * qtt;

      const result = await SaleModel.create({
        ...req.body,
        unitPrice: price,
        totalPrice: totalPrice,
        idClient: client.id,
        idProduct: product.id,
      });

      return res.status(201).json({
        body: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Product not registered successfully!",
      });
    }
  }
);

module.exports = router;

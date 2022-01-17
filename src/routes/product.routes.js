const router = require("express").Router();

const userModels = require("../models/user.model");
const productModel = require("../models/product.model");
const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post(
  "/add/product",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const id = loggedInUser.id;

      const result = await productModel.create({
        ...req.body,
        idUserOwner: id,
      });
      return res.status(200).json({
        error: false,
        msg: "Product registered successfully!",
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

// ================================================
//     rota de busca, todos clientes cadastrados
// ================================================
router.get(
  "/all/products",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const product = await productModel.findAll({ include: userModels });
      return res.status(200).json(product);
    } catch {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

module.exports = router;

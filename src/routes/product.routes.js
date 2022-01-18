const router = require("express").Router();

const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ================================================
//     rota de post, criar um cadastro de produtos
//
//     - criar um produto (store)
// ================================================

router.post(
  "/product",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const id = loggedInUser.id;

      const result = await ProductModel.create({
        ...req.body,
        idUserOwner: id,
      });
      return res.status(200).json({
        msg: "Product registered successfully!",
        body: result,
      });
    } catch (err) {
      console.log(err);
      const msg = err.errors[0].message;
      const path = err.errors[0].path;
      return res.status(400).send({
        msg,
        path,
      });
    }
  }
);

// ================================================
//     rota de get all, todos produtos cadastrados
//
//  - listar todos os produtos cadastrados (index)
//     - apenas dados principais devem vir aqui;
//     - ordenar alfabeticamente.
// ================================================
router.get(
  "/products",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const product = await ProductModel.findAll({
        order: [["title", "ASC"]],
        attributes: ["id", "title", "price"],
        include: [
          {
            model: UserModel,
            attributes: ["id", "name"],
          },
        ],
      });
      return res.status(200).json(product);
    } catch {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// ================================================
//     rota de get one, detalhar produto por id
//
//   - detalhar um produto (show)
// ================================================
router.get(
  "/products/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const product = await ProductModel.findOne({
        id: req.params.id,
        includes: UserModel,
      });

      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
);

// ================================================
//     rota de update, atualizar produto por id
//
//   - editar um produto (update)
// ================================================
router.put(
  "/update/products/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const product = await ProductModel.update(
        { ...req.body },
        { returning: true, where: { id: req.params.id } }
      );
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
);

// ================================================
//     rota de delete, deletar produto por id
//
//   - exclusão lógica ("soft delete") de um produto (delete)
// ================================================
router.delete("/delete/products/:id", async (req, res) => {
  try {
    await ProductModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json("deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

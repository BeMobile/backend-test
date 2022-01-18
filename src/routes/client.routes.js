const router = require("express").Router();

const ProductModel = require("../models/product.model");
const SaleModel = require("../models/sale.model");
const ClientModel = require("../models/client.model");
const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ===============================
//     rota de criação/ cliente
//
// - adicionar um(a) cliente (store)
// ===============================
router.post(
  "/clients",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    console.log(req.body);
    try {
      const { cpf } = req.body;
      console.log(cpf);

      const user = await ClientModel.findOne({ where: { cpf: cpf } });

      // verifica se cpf já foi cadastrado
      if (user) {
        return res
          .status(400)
          .json({ msg: "This cpf is already registered on the list client!" });
      }

      const result = await ClientModel.create(req.body);
      return res.status(200).json({
        msg: "Client registered successfully!",
        body: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Client not registered!",
      });
    }
  }
);

// ================================================
//     rota de busca, todos clientes cadastrados
//
// - listar todos os clientes cadastrados (index)
//     - apenas dados principais devem vir aqui(nome, cpf)
//     - ordenar pelo id.
// ================================================
router.get("/clients", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    const clients = await ClientModel.findAll({
      attributes: ["id", "name", "cpf"],
      order: [["id", "ASC"]],
    });
    return res.status(200).json(clients);
  } catch {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});
// =======================================================
//       rota de busca, detalhar um cliente cadastrados
//
// - detalhar um(a) cliente e vendas a ele(a) (show)
//     - trazer as vendas mais recentes primeiro;
//     - possibilidade de filtrar as vendas por mês + ano.
// =======================================================
router.get(
  "/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const user = await ClientModel.findOne({
        where: { id: req.params.id },
        attributes: ["id", "name", "birthday"],
        include: [
          {
            model: SaleModel,
            attributes: ["id", "qtt", "totalPrice", "dateOfSale"],
            order: [["dateOfSale", "ASC"]], // nao esta funcionando
            include: [
              {
                model: ProductModel,
                attributes: ["id", "title", "price"],
              },
            ],
          },
        ],
      });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ msg: "Client not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// =======================================================
//       rota de update, editar cliente
//
//   - editar um(a) cliente (update)
// =======================================================
router.put(
  "/update/clients/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const client = await ClientModel.update(
        { ...req.body },
        { returning: true, where: { id: req.params.id } }
      );
      if (!client) {
        return res.status(404).json({ msg: "Client not found" });
      }
      return res.status(200).json(clientUpdate);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
);

// =======================================================
//       rota de exclusão, delete cliente
//
//  - excluir um(a) cliente e vendas a ele(a) (delete)
// =======================================================
router.delete(
  "/delete/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const result = await ClientModel.destroy({
        where: { id: req.params.id },
      });
      console.log(result);
      if (result !== 1) {
        return res.status(404).json({ msg: "Client not found!" });
      }
      return res.status(201).json({ msg: "Client successfully deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);
module.exports = router;

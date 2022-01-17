const router = require("express").Router();

const clientModel = require("../models/client.model");
const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ===============================
//     rota de criação/ cliente
// ===============================
router.post("/add/client", async (req, res, next) => {
  console.log(req.body);
  try {
    const { cpf } = req.body;
    console.log(cpf);

    const user = await clientModel.findOne({ where: { cpf: cpf } });

    // verifica se cpf já foi cadastrado
    if (user) {
      return res
        .status(400)
        .json({ msg: "This cpf is already registered on the list client!" });
    }

    const result = await clientModel.create(req.body);
    return res.status(200).json({
      error: false,
      msg: "Client registered successfully!",
      body: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      msg: "Client not registered successfully!",
    });
  }
});

// ================================================
//     rota de busca, todos clientes cadastrados
//
// - listar todos os clientes cadastrados (index)
//     - apenas dados principais devem vir aqui(nome, cpf)
//     - ordenar pelo id.
// ================================================
router.get(
  "/all/clients",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const clients = await clientModel.findAll({
        attributes: ["name", "cpf"],
      });
      return res.status(200).json(clients);
    } catch {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);
// =======================================================
//       rota de busca, detalhar um cliente cadastrados
//
// - detalhar um(a) cliente e vendas a ele(a) (show)
//     - trazer as vendas mais recentes primeiro;
//     - possibilidade de filtrar as vendas por mês + ano.
// =======================================================
router.get(
  "/show/client/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const user = await clientModel.findOne({
        where: { id: req.params.id },
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
//       rota de busca, detalhar um cliente cadastrados
//
// - detalhar um(a) cliente e vendas a ele(a) (show)
//     - possibilidade de filtrar as vendas por mês + ano.
// =======================================================

module.exports = router;

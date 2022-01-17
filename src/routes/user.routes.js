const router = require("express").Router();
const bcrypt = require("bcryptjs");

const salt_rounds = 10;

const userModel = require("../models/user.model");
const generateToken = require("../config/jwt.config");
const attachCurrentUser = require("../middlewares/attackCurrentUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

// ======================
//     rota de signup
// ======================
router.post("/signup", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ where: { email: email } });
    console.log("password aqui", password);

    // verifica se email já foi cadastrado
    if (user) {
      return res
        .status(400)
        .json({ msg: "This email is already registered on the web site!" });
    }

    // Verifica se a senha não está em branco ou se a senha não é complexa o suficiente
    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      // O código 400 significa Bad Request
      return res.status(400).json({
        msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    // Gera o salt
    const salt = await bcrypt.genSalt(salt_rounds);

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(req.body);

    // criar usuario
    const result = await userModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    //retorna usuario cadastrado
    return res.status(200).json({
      error: false,
      msg: "User registered successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: true,
      msg: "User not registered successfully!",
    });
  }
});

// ======================
//     rota de login
// ======================
router.post("/login", async (req, res, next) => {
  try {
    // Extraindo o email e senha do corpo da requisição
    const { email, password } = req.body;

    // Pesquisar esse usuário no banco pelo email
    const user = await userModel.findOne({ where: { email: email } });
    // console.log("user aqui", user);

    // Se o usuário não foi encontrado, significa que ele não é cadastrado
    if (!user) {
      return res
        .status(400)
        .json({ msg: "This email is not yet registered in our website;" });
    }

    // console.log(password, user.passwordHash);
    // Verificar se a senha do usuário pesquisado bate com a senha recebida pelo formulário
    if (await bcrypt.compareSync(password, user.passwordHash)) {
      // Gerando o JWT com os dados do usuário que acabou de logar
      const token = generateToken(user);
      console.log("token", token);
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        },
        token,
      });
    } else {
      // 401 Significa Unauthorized
      return res.status(401).json({ msg: "Wrong password or email" });
    }
  } catch (err) {
    console.error("erro", err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// ============================================
//     rota de busca, info usuario logado
// ============================================
router.get(
  "/user/index",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    console.log("index", req.currentUser);
    try {
      // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
      const loggedInUser = req.currentUser;
      const id = loggedInUser.id;
      if (loggedInUser) {
        // Responder o cliente com os dados do usuário. O status 200 significa OK
        const user = await userModel.findOne({ where: { id: id } });
        console.log(user);
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ msg: "User not found." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

// ================================================
//     rota de busca, todos clientes cadastrados
// ================================================
router.get("/index", isAuthenticated, attachCurrentUser, async (req, res) => {
  console.log("index");
  try {
    const users = await userModel.findAll();
    return res.status(200).json(users);
  } catch {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;

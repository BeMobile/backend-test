const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");

const isPasswordFormatInvalid = require("../utils/password.utils");

const UserModel = require("../models/user.model");

const salt_rounds = 10;

exports.create = async (req, res) => {
  try {
    const { password } = req.body;

    if (isPasswordFormatInvalid(password) === true) {
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
    const result = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(200).json({
      msg: "User registered successfully!",
    });
  } catch (err) {
    const msg = err.errors[0].message;
    return res.status(500).json({
      msg,
    });
  }
};

exports.createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "This email is not yet registered in our website;" });
    }

    // Verificar se a senha do usuário pesquisado bate com a senha recebida pelo formulário
    if (await bcrypt.compareSync(password, user.password)) {
      // Gerando o JWT com os dados do usuário que acabou de logar
      const token = generateToken(user);

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
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};

exports.get = async (req, res) => {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const loggedInUser = req.currentUser;
    const id = loggedInUser.id;
    if (loggedInUser) {
      const user = await UserModel.findOne({
        where: { id: id },
        attributes: ["id", "name", "email"],
      });
      console.log(user);
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};

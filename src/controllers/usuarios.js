const knex = require('../config');
const bcrypt = require('bcrypt');
const schemaCadastroUsuario = require('../validation/schemaCadastroUsuario');

const cadastrarUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaCadastroUsuario.validate(req.body);

        const usuarioEncontrado = await knex('usuarios').where({ email }).first();

        if (usuarioEncontrado) {
            return res.status(400).json("O email já existe");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({ email, 'senha' : senhaCriptografada});

        if (usuario.length === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json('Usuário cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario
}
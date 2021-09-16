const knex = require('../config');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const senhaHash = require('../senhaHash');
const schemaLogin = require('../validation/schemaLogin');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);

        const usuario = await knex('usuarios').where({ email }).first();
        
        if (!usuario) {
            return res.status(404).json("Usuário não encontrado");
        }

        const senhaValidada = await bcrypt.compare(senha, usuario.senha);

        if(!senhaValidada) {
            return res.status(400).json("O endereço de email ou a senha que você inseriu não é válido")
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario, email: usuario.email}, senhaHash, {expiresIn: '24h'});

        const {senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: {
                id_usuario: dadosUsuario.id_usuario,
                email: dadosUsuario.email
            }, 
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    login
}
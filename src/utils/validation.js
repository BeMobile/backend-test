const { validationResult } = require('express-validator');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
    validarCpf(req, res, next) {
        const result = cpf.isValid(req.body.cpf);
        if (!result) {
            return res.status(400).json({ message: "CPF inválido!!" });
        }
        req.body.cpf = cpf.format(req.body.cpf);
       
        next();
    },
    validar(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};
const yup = require('./config');

const schemaCadastroUsuario = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required()
});


module.exports =  schemaCadastroUsuario;
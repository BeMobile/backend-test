const yup = require('./config');

const schemaCadastroCliente = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    endereco: yup.string().required(),
    telefone: yup.string().required()
});


module.exports =  schemaCadastroCliente;
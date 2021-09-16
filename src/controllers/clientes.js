const knex = require('../config');
const schemaCadastroCliente = require('../validation/schemaCadastroCliente');

const cadastrarCliente = async (req, res) => {
    const { nome, cpf, endereco, telefone } = req.body;

    try {
        await schemaCadastroCliente.validate(req.body);
    
        const clienteExistente = await knex('clientes').where({ cpf });

        if (clienteExistente[0]) {
            return res.status(400).json("Cliente já cadastrado");
        }

        const cliente = await knex('clientes').insert({ nome, cpf, endereco, telefone });
        
        return res.status(200).json('Cliente cadastrado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const listarClientes = async (req, res) => {

    try {
        const listaDeClientes = await knex('clientes').orderBy('id_cliente');


        if(!listaDeClientes[0]){
            return res.status(404).json('Não possui cliente cadastrado');
        }

        return res.status(200).json(listaDeClientes);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {

        const clienteEncontrado = await knex('clientes').where({ id_cliente: id });

        if(!clienteEncontrado[0]){
            return res.status(404).json("Cliente não encontrado");
        }

        const clienteEVendas = await knex('vendas')
        .leftJoin('clientes', 'vendas.id_cliente', 'clientes.id_cliente')
        .orderBy('data_e_hora');

        if(!clienteEVendas[0]){
            return res.status(404).json('Não possui cliente ou venda cadastrada');
        }

        return res.status(200).json(clienteEVendas);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const editarCliente = async (req, res) => {
    const { nome, cpf, endereco, telefone } = req.body;
    const { id } = req.params;
       
    try {

        const clienteExistente = await knex('clientes').where({ cpf });

        if (!clienteExistente[0]) {
            return res.status(400).json("Cliente não encontrado");
        }
    
        const clienteAtualizado = await knex('clientes').where({ id_cliente: id }).update({ nome, cpf, endereco, telefone });

        if (!clienteAtualizado) {
            return res.status(400).json("O Cliente não foi atualizado");
        }

        return res.status(200).json('Cliente atualizado com sucesso!');


    } catch (error) {
        return res.status(400).json(error.message)
    }

};


const excluirCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const clienteExistente = await knex('clientes').where({ id_cliente: id });

        if (!clienteExistente[0]) {
            return res.status(400).json("Cliente não encontrado");
        }

        const clienteEVendas = await knex('vendas')
        .leftJoin('clientes', 'vendas.id_cliente', 'clientes.id_cliente')
        .where({ id_cliente: id});

        if(!clienteEVendas[0]){
            return res.status(404).json('Não possui cliente ou venda cadastrada');
        }

        const clienteExcluido = await knex('vendas')
        .leftJoin('clientes', 'vendas.id_cliente', 'clientes.id_cliente')
        .where({ id_cliente: id})
        .del();
 
        if(!clienteExcluido){
            return res.status(400).json('Não foi possivel excluir o produto');
        }

        return res.status(200).json('Cliente excluido com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    cadastrarCliente,
    listarClientes,
    detalharCliente,
    editarCliente,
    excluirCliente
}
const knex = require('../config');


const venda = async (req, res) => {
    const { id_cliente, id_produto, quantidade } = req.body;

    try {
   
        const clienteExistente = await knex('clientes').where({ id_cliente });

        if (!clienteExistente[0]) {
            return res.status(400).json("Cliente não existe");
        }

        const produtoExistente = await knex('produtos').where({ id_produto });

        if (!produtoExistente[0]) {
            return res.status(400).json("Produto não existe");
        }

        const produto = await knex('produtos').where({ id_produto });

        const preco = produto[0].preco;
    
        const valorTotal = quantidade * preco;
    
        const data = Date.now();
        const dataConvertida = new Date(data);

        const venda = await knex('vendas').insert({ id_cliente, id_produto, quantidade, 'preco': preco, 'preco_total': valorTotal, 'data_e_hora': dataConvertida });
     
        return res.status(200).json('Venda concluida com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    venda
}
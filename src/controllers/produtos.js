const knex = require('../config');

const cadastrarProduto = async (req, res) => {
    const { id_categoria, nome_produto, preco } = req.body;

    try {
    
        const produtoExistente = await knex('produtos').where({ nome_produto }).andWhere({ id_categoria });

        if (produtoExistente[0]) {
            return res.status(400).json("O produto já cadastrado");
        }

        const categoria = await knex('categorias').where('id_categoria', '=', id_categoria);

        if(!categoria[0]) {
            return res.status(400).json("Categoria não existe");
        }

        const produto = await knex('produtos').insert({ id_categoria, nome_produto, preco });
        
        return res.status(200).json('Produto cadastrado com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const listarProdutos = async (req, res) => {

    try {
        const listaDeProdutos = await knex('produtos')
        .orderBy('nome_produto')
        .where('ativo', '=', '1')
        .leftJoin('categorias', 'produtos.id_categoria', 'categorias.id_categoria');

        if(!listaDeProdutos[0]){
            return res.status(404).json('Não possui produto cadastrado');
        }

        const arrayProdutos = await listaDeProdutos.map(produtos => {
            return {
              nome_produto: produtos.nome_produto,
              nome_categoria: produtos.nome,
              preco: produtos.preco
            }
        });

        return res.status(200).json(arrayProdutos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produtos').where({ id_produto: id });

        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }

        return res.status(200).json(produtoEncontrado[0]);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const editarProduto = async (req, res) => {
    const { id_categoria, nome_produto, preco } = req.body;
    const { id } = req.params;
       
    try {

        const produtoEncontrado = await knex('produtos').where({ id_produto: id });
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }
            
        const categoria = await knex('categorias').where('id_categoria', '=', id_categoria);

        if(!categoria[0]) {
            return res.status(400).json("Categoria não existe");
        }
    
        const produtoAtualizado = await knex('produtos').where({ id_produto: id }).update({ id_categoria, nome_produto, preco });

        if (!produtoAtualizado) {
            return res.status(400).json("O produto não foi atualizado");
        }

        return res.status(200).json('Produto atualizado com sucesso!');


    } catch (error) {
        return res.status(400).json(error.message)
    }

};

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoEncontrado = await knex('produtos').where({ id_produto: id });
        
        if(!produtoEncontrado[0]){
            return res.status(404).json("Produto não encontrado");
        }

        const produtoAtivo = await knex('produtos').where('ativo', true).andWhere({ id_produto: id });

        if(!produtoAtivo[0]){
            return res.status(400).json('produto já foi excluido');
        }

        const produtoDesativado = await knex('produtos').update('ativo', false).where({ id_produto: id });

        return res.status(200).json('Produto excluido com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    detalharProduto,
    editarProduto,
    excluirProduto
}
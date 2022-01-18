'use strict'

const Database = use('Database')

const Produto = use('App/models/Produto')
class ProdutoController {
  /**
   * Show a list of all products.
   * GET products

   */
  async index () {

    return await Database
      .table('produtos')
      .orderBy('nome','asc')


  }

  /**
   * Create/save a new product.
   * POST products
   */
  async store ({ request , response}) {
    const data = request.only(["nome", "valor", "autor", "categoria"]);

    const produto = await Produto.create(data);

    response.status(201).json({
      message: 'Successo criado novo produto.',
      data: produto
    })
  }

  /**
   * Display a single product.
   * GET products/:id

   */
  async show ({ params}) {
    const produto = await Produto.findOrFail(params.id);


    return produto;
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   */
  async update ({ params, request , response }) {
    const produto = await Produto.findOrFail(params.id);
    const data = request.only(["nome", "valor", "autor", "categoria"]);

    produto.merge(data);
    await Produto.save();

    response.status(200).json({
      message: 'Successo atualizado produto.',
      data: produto
    })

  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   */
  async destroy ({ params, response}) {
    const produto = await Produto.findOrFail(params.id);


    await produto.delete();
    response.status(200).json({
      message: 'Successo produto deletado.',
    })
  }
}

module.exports = ProdutoController

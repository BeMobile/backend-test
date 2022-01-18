'use strict'

const Endereco = use('App/Models/Endereco')

/**
 * Resourceful controller for interacting with enderecoes
 */
class EnderecoController {
  async index () {

    const endereco = await Endereco
    .query().with('clientes')
    .fetch();

    return endereco;
  }

  async store ({ request, response }) {
    const {cliente_id , ...data} = request
    .only(["rua", "numero","cep","bairro","cidade","cliente_id"]);

    const endereco = await Endereco.create({cliente_id, ...data});


    response.status(201).json({
      message: 'Successo criado novo endereco.',
      data: endereco
    })
  }

  async update ({ params, request, response }) {
    const endereco = await Endereco.findOrFail(params.id);
    const data = request.only(["rua", "numero","cep","bairro","cidade","cliente_id"]);

    endereco.merge(data);
    await endereco.save();

    response.status(200).json({
      message: 'Successo atualizado endereco.',
      data: endereco
    })
  }



}

module.exports = EnderecoController

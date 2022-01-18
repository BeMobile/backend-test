'use strict'

const Contato = use('App/Models/Contato')

/**
 * Resourceful controller for interacting with contatos
 */
class ContatoController {

  /**
   * Create/save a new contato.
   * POST contatos
   */
  async store ({ request, response }) {
    const {cliente_id , ...data} = request.only(["phone","cliente_id"]);



    const contato = await Contato.create({cliente_id, ...data});

    response.status(201).json({
      message: 'Successo criado novo contato.',
      data: contato
    })
  }

  /**
   * Update contato details.
   * PUT or PATCH contatos/:id
   */

  async update ({ params, request, response }) {
    const contato = await Contato.findOrFail(params.id);
    const data = request.only(["phone","cliente_id"]);

    contato.merge(data);
    await contato.save();

    response.status(200).json({
      message: 'Successo atualizado produto.',
      data: contato
    })
  }


}

module.exports = ContatoController

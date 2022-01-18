'use strict'


const Database = use('Database')
const Cliente = use('App/Models/Cliente')

class ClienteController {

  async index() {

    const cliente = await Cliente.query()
    .with('enderecos')
    .with('contatos')
    .fetch()

    return cliente;
  }

  async store({ request, response }) {
    const data = request.only(["nome", "cpf"]);

    const cliente = await Cliente.create(data);

    response.status(201).json({
      message: 'Successo criado novo Cliente.',
      data: cliente
    })
  }

  async show ({params}) {

    const cliente = await Cliente.findOrFail(params.id)
    const venda = await Database
    .from('vendas')
    .where({ cliente_id: params.id })
    .orderBy('created_at', 'desc')

    return ({cliente,venda})
  }

  async update({ params, request }) {
    const cliente = await Cliente.findOrFail(params.id);
    const data = request.only(["nome", "cpf"]);

    cliente.merge(data);
    await Cliente.save();

    response.status(201).json({
      message: 'Successo atualizou Cliente.',
      data: cliente
    })
  }

  async destroy({ params, response}) {

    const cliente = await Cliente.findOrFail(params.id);


    await cliente.delete();
    response.status(200).json({
      message: 'Successo deletou Cliente.',
    })
  }
}

module.exports = ClienteController

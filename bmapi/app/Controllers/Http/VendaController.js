'use strict'

const Venda = use('App/Models/Venda')


/**
 * Resourceful controller for interacting with vendas
 */
class VendaController {

  async index () {
      const vendas = await  Venda.all()

      return vendas;
  }

  async store ({ request , response}) {
    const {cliente_id,produto_id, ...data} = request
    .only(["cliente_id", "produto_id","quantidade","valoruni","valortotal"]);

    const venda = await Venda.create({cliente_id,produto_id, ...data})


    response.status(201).json({
      message: 'Sucesso criada nova venda.',
      data: venda
    })

  }


}

module.exports = VendaController

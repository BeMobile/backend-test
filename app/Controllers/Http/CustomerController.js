'use strict'

const Customer = use('App/Models/Customer')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
    /**
     * Show a list of all customers.
     * GET customers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const customer = await Customer.all()

        return customer
    }

    /**
     * Create/save a new customer.
     * POST customers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth, response }) {
        const data = request.all(['name', 'adress', 'phone', 'cell_phone', 'cpf']);

        const customer = await Customer.create({ user_id: auth.user.id, ...data })


        return (customer)

    }

    /**
     * Display a single customer.
     * GET customers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        const customer = await Customer
            .query()
            .select('*')
            .from('sales')
            .fetch()



        return customer;
    }

    /**
     * Update customer details.
     * PUT or PATCH customers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request }) {
        const customer = await Customer.findOrFail(params.id);
        const data = request.all(['name', 'adress', 'phone', 'cell_phone', 'cpf']);


        await customer.merge({...data })
        await customer.save()

        return (customer)
    }

    /**
     * Delete a customer with id.
     * DELETE customers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, auth, response }) {
        const customer = await Customer.findOrFail(params.id);

        if (customer.user_id !== auth.user.id) {
            response.send({ message: "Não foi possível realizar a exclusão! Somente o responsável pelo cadastro pode excluir o cadastro." });
            response.status(401)
            return
        }

        await customer.delete(params.id)

        return response.send({ message: 'Cliente deletado com sucesso' })
    }
}

module.exports = CustomerController
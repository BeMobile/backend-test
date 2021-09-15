'use strict'

const Sale = use('App/Models/Sale')
const Car = use('App/Models/Car')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sales
 */
class SaleController {
    /**
     * Show a list of all sales.
     * GET sales
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request }) {
        const query = await Sale
            .query()
            .filter(request.all())
            .fetch()
    }


    /**
     * Create/save a new sale.
     * POST sales
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const data = request.all(['customer_id', 'car_id'])


        const car_id = parseInt(data.car_id)

        const setSold = await Car
            .query()
            .where('id', car_id)
            .update({ sold: 1 })

        const quantity = 1
        const car = await Car.find(car_id)

        const total = car.price * quantity

        const sale = await Sale.create({ user_id: auth.user.id, ...data, quantity: quantity, price: car.price, total_price: total })

        return sale;
    }

    /**
     * Display a single sale.
     * GET sales/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        const customer_id = params.id


        const sales = await Sale.query().with('customer').orderBy('created_at', 'desc').where('customer_id', params.id).fetch()

        return sales;

    }



}

module.exports = SaleController
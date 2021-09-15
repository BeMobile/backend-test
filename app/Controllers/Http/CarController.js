'use strict'

const Car = use('App/Models/Car')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cars
 */
class CarController {
    /**
     * Show a list of all cars.
     * GET cars
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response }) {
        const car = await Car
            .query()
            .where('status', '0')
            .andWhere('sold', '0')
            .orderBy('title', 'asc')
            .fetch()

        return car
    }

    /**
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */

    /**
     * Create/save a new car.
     * POST cars
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const data = request.all(['title', 'description', 'color', 'fuel_type', 'brand', 'model', 'features', 'transmission', 'price', 'mileage']);

        /* everything product registered receive status value 0, for further logical exclusion  */
        const status = 0;
        const sold = 0;
        const car = await Car.create({ user_id: auth.user.id, status: status, ...data, sold: sold });

        return (car)
    }

    /**
     * Display a single car.
     * GET cars/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, response }) {
        const car = await Car.findOrFail(params.id);

        if (car.status == 1) {
            return response.send({ message: 'Carro não encontrado, não cadastrado ou excluido pelo anunciante!' })
        }

        return car

    }

    /**
  
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */


    /**
     * Update car details.
     * PUT or PATCH cars/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response, auth }) {
        const car = await Car.findOrFail(params.id);

        if (car.user_id !== auth.user.id) {
            response.send({ message: "Não foi possível realizar a edição! Somente o responsável pelo cadastro tem permissão para edição das informações." });
            response.status(401)
            return

        }
        const data = request.all(['title', 'description', 'color', 'fuel_type', 'brand', 'model', 'features', 'transmission', 'price', 'mileage']);

        await car.merge({...data })
        await car.save()

        return (car)

    }

    /**
     * Delete a car with id.
     * DELETE cars/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, auth, response }) {
        const car = await Car.findOrFail(params.id);

        if (car.user_id !== auth.user.id) {
            response.send({ message: "Não foi possível realizar a exclusão! Somente o responsável pelo cadastro pode excluir o cadastro." });
            response.status(401)
            return

        }
        /* Logical deletion is done by assigning the status with the value 1 */
        await car.merge({ status: 1 })
        await car.save()

        return response.send({ message: 'Carro deletado com sucesso' })

    }
}

module.exports = CarController
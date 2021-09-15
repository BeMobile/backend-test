'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
    sale() {
        return this.belongsTo("App/Models/Sale")
    }

    static get hidden() {
        return ['cpf', 'user_id']
    }
}

module.exports = Customer
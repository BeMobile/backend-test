'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class Sale extends Model {
    customer() {
        return this.belongsTo("App/Models/Customer")
    }

    static get hidden() {
        return ['user_id']
    }


}

module.exports = Sale
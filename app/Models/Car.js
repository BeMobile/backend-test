'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Car extends Model {
    static get hidden() {
        return ['sold', 'updated_at', 'status', 'user_id']
    }


}

module.exports = Car
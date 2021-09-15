'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaleSchema extends Schema {
    up() {
        this.create('sales', (table) => {
            table.increments()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
            table.integer('customer_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('customers')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.integer('car_id')
            table.integer('quantity')
            table.float('price')
            table.float('total_price')
            table.timestamps()
        })
    }

    down() {
        this.drop('sales')
    }
}

module.exports = SaleSchema
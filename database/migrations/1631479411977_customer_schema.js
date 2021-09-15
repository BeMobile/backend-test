'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
    up() {
        this.create('customers', (table) => {
            table.increments()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
            table.string('name', 50).notNullable()
            table.string('cpf', 11).notNullable().unique()
            table.string('adress', 200).notNullable()
            table.string('phone', 20)
            table.string('cell_phone', 20).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('customers')
    }
}

module.exports = CustomerSchema
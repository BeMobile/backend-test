'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CarSchema extends Schema {
    up() {
        this.create('cars', (table) => {
            table.increments()
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            table.string('title', 100).notNullable()
            table.string('description', 1000)
            table.string('color', 20)
            table.string('fuel_type', 50)
            table.string('brand', 50)
            table.string('model', 50)
            table.string('features', 300)
            table.string('Transmission', 50)
            table.float('price').notNullable()
            table.integer('mileage')
            table.boolean('status')
            table.boolean('sold')


            table.timestamps()
        })
    }

    down() {
        this.drop('cars')
    }
}

module.exports = CarSchema
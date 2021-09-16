const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        database: 'bemobile',
        password: 'password',
    }
});

module.exports = knex;
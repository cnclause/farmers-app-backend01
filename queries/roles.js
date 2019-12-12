const knex = require('../db/knex')

module.exports = {
    getAll() {
        return knex ('roles')
    }, 
    create(name) {
        return knex('roles').insert(name, '*')
    }
}
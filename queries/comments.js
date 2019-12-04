const knex = require('../db/knex')

module.exports = {
    getAll() {
        return knex ('comments')
    }, 
    getOne(id) {
        return knex('comments').where('id', id).first()
    },
    create(comment) {
        return knex('comments').insert(comment, '*')
    }
}
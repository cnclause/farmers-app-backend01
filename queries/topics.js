const knex = require('../db/knex')

module.exports = {
    getAll() {
        return knex ('topics').orderBy('created_at', 'asc')
    }, 
    getOne(id) {
        return knex('topics').where('id', id).first()
    },
    create(topic) {
        return knex('topics').insert(topic, '*')
    }
}
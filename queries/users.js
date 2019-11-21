const knex = require('../db/knex')

module.exports = {
    getOne(id){
        return knex('users').where('id', id).first()
    },
    findByEmail(email){
        return knex('users').where('email', email).first()
    }
}
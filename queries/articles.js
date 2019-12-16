const knex = require('../db/knex')

module.exports = {
    getAll(){
        return knex ('articles')
    },
    create(article){
        return knex('articles').insert(article, '*')
    }
}
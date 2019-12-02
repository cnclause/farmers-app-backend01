const express = require('express')
const router = express.Router()
const knex = require('../db/knex')


const queries = require('../queries/comments')

router.get('/:id', (req, res) => {
    if(!isNaN(req.params.id)){
        queries.getOne(req.params.id).then(comment => {
            if(comment){
                res.json(comment)
            } else {
                resError(res, 404, "Comment not found")
            }
        })
    } else {
        resError(res, 500, "Invalid ID")
    }
})

router.get('/', (req, res) => {
    // queries.getAll().then(comments => {
    //     res.json(comments)
    // })
    knex('comments')
        .whereNotNull('comments.parent_id')
        .andWhere('comments.id', 'comments.parent_id')
        .then(console.log)
//         .then(comments => res.json(comments))
})

module.exports = router
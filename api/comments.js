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
    // return knex('comments').groupBy('id')
    //     .havingNotNull('parent_id')
        getResponsesOfComments()
            .then(comments => res.json({comments}))
})

function getResponsesOfComments() {
    return knex('comments').groupBy('id')
    .then(comments => {
        const promises = comments.map(comment => {
            return knex('comments').where({parent_id: comment.id})
            .then(responses => {
                comment.responses = responses
                return comment
            })
        })
        return Promise.all(promises)
    })
}

module.exports = router
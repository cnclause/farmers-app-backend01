const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../queries/topics')

function validId(req, res, next){
    if(!isNaN(req.params.id)) return next()
    next( new Error ('Invalid ID'))
} 

router.get('/:id', validId, (req, res, next) => {
    knex('topics')
        .join('comments', 'topics.id', 'comments.topic_id')
        .where('topics.id', req.params.id)
        .then(comments => {
            res.json({topic: comments})
        })
    }
)

function getTopicsWithComments() {
    return knex('topics')
    .then(topics => {
        const promises = topics.map(topic => {
            // console.log(topic)
            return knex('comments').where({topic_id: topic.id})
            .then(comments => {
                topic.comments = comments
                // console.log('comments',comments)
                console.log('comment', comments)
                return topic
            })
        })
        return Promise.all(promises)
    })
}

// function getResponsesOfComments() {
//     return knex('comments').groupBy('id')
//     .then(comments => {
//         const promises = comments.map(comment => {
//             return knex('comments').where({parent_id: comment.id})
//             .then(responses => {
//                 comment.responses = responses
//                 console.log(comment)
//                 // return comment
//             })
//         })
//         return Promise.all(promises)
//     })
// }

router.post('/', (req, res) => {
    queries.create(req.body).then(topics => {
        res.json(topics[0])
    })
})

router.get('/', (req, res) => {
    getTopicsWithComments()
        .then(comments => {res.json(comments)})
    // queries.getAll()
    //     .then(topics => res.json(topics))
    })

   

module.exports = router
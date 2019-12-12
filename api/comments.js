const express = require('express')
const router = express.Router()
const knex = require('../db/knex')

const _ = require('lodash')


const queries = require('../queries/comments')

router.get('/topics', (req, res) => {
    getTopicsWithComments()
        .then(topics => res.json(topics))
})

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


router.post('/', (req, res) => {
    queries.create(req.body).then(comments => {
        res.json(comments[0])
    })
})


async function getTopics(){
    return await knex('topics').orderBy('created_at', 'desc')
}

async function getComments(){
    return await knex('comments').orderBy('created_at', 'desc')
}

async function getTopicsWithComments(){
    // need to add comments as an empty array on creation of posts so can iterate in front end
    const topics = await getTopics()
    const comments = await getComments()
    topics.forEach(topic => {
        const topLevelComments = comments.filter(comment =>{
            return comment.topic_id === topic.id && !comment.parent_id
        })
        topLevelComments.forEach(topLevelComment => {
            const lowerLevelComments = comments.filter(comment => {
                return comment.parent_id === topLevelComment.id
            })
            lowerLevelComments.forEach(lowerLevelComment => {
                const continuedComments = comments.filter(comment => {
                    return comment.parent_id === lowerLevelComment.id
                })
                lowerLevelComment.comments = continuedComments
            })
            topLevelComment.comments = lowerLevelComments
        })
        topic.comments = topLevelComments
    })
    return topics
}



module.exports = router
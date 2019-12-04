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

// router.get('/', (req, res) => {
//     getResponsesOfComments()
//         .then(comments => res.json(comments))
// })

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

// async function getTopicswithAllComments(){
//     const topics = await getTopics()
//     const comments = await getComments()
//     const hasParent = false

//     topics.forEach(topic => {
//         const topLevelComments = comments.filter(comment =>{
//             return comment.topic_id === topic.id && !comment.parent_id
//         })
//         const checkForParent = (comment) => {
//            topLevelComments.forEach(topLevelComment =>{
//                console.log('comment', comment)
//                console.log('toplevel', topLevelComment)
//                comment.parent_id === topLevelComment.id
//            })
//         }
//         console.log(comments.some(checkForParent))

//     })
// }

 // for each comment find any comments that have that comment as parent id
    // will take in a comment and go through all comments and find any comments that have parent id that matches the comment id

// function findChildrenId(id){
//     // console.log('commentinfunction', typeof id) 
//    return knex('comments').groupBy('id')
//     .then(allComments => {
//         // console.log('allcomments',allComments) an array
//         allComments.filter(comments => {
//             // console.log('FilterparentID', typeof comments.parent_id, comments.parent_id)
//             return comments.parent_id === id})
//     })
// }



module.exports = router
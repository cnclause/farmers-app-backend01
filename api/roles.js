const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../queries/topics')

router.get('/', (req, res) => {
    queries.getAll()
        .then(roles => {
            res.json(roles)
        })
})

router.post('/', (req, res, next) => {
    queries.create(req.body).then(roles => {
       return res.json(roles[0])
    })
})

module.exports = router
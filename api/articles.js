const express = require('express')
const router = express.Router()

const queries = require('../queries/articles')

router.get('/', (req, res) => {
    queries.getAll()
        .then(articles => res.json(articles))
})

router.post('/', (req, res) => {
    queries.create(req.body).then(articles => {
        res.json(articles[0])
    })
})

module.exports = router
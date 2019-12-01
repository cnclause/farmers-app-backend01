const express = require('express')
const router = express.Router()

const queries = require('../queries/users')


router.get('/:id', (req, res) => {
    if (!isNaN(req.params.id)){
        queries.getOne(req.params.id).then(user => {
            if(user){
                delete user.password
                res.json(user)
            } else {
                resError(res, 404, "User Not Found")
            }
        })
    } else {
        resError(res, 500, "Invalid ID")
    }
})

router.patch('/:id', (req, res, next) => {
    queries.updateUser(req.params.id, req.body)
        .then(user => {
            res.json(user[0])
        })
})
function resError(res, statusCode, message){
    res.status(statusCode)
    res.json({ message })
}

module.exports = router
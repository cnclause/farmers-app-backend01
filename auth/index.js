const express = require('express')
const passport = require('passport')
require('../passport/google')
const router = express.Router()


router.get('/google',
passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/callback',
    passport.authenticate('google', {
        failuredRedirect:'/login'}),
        function(req, res){
            //successful authentication, redirect home
            res.redirect('/')
        })







module.exports = router
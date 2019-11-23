const express = require('express')
const passport = require('passport')
require('../passport/google')

const { create } = require('./utils');

const router = express.Router()

// router.get('/', (req, res) => {
//     res.json({
//         message: "in auth"
//     })
// })


router.get('/google',
passport.authenticate('google', {
    scope: ['openid', 'profile', 'email']
}))

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
        if (err) { return next(err) }
        try {
            console.log('creating token with', user)
            const token = await create(user)
            res.json({ token })
            // res.redirect(`${process.env.CLIENT_REDIRECT}${token}`)
        } catch (error) {
            // res.redirect(`${process.env.CLIENT_ERROR_REDIRECT}${error.message}`)
            res.json({ error })
        }

    }) (req, res, next)     
})



module.exports = router
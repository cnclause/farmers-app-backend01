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
    passport.authenticate('google', {session: false}, async (err, user) => {
        if (err) { return next(err) }
        try {
            console.log('creating token with', user)
            const token = await create(user)
            // res.json({ token })
            res.redirect(`${process.env.CLIENT_REDIRECT}?token=${token}`)
            // res.send(createAuthPage(token))
        } catch (error) {
            res.redirect(`${process.env.CLIENT_ERROR_REDIRECT}${error.message}`)
            res.json({ error })
        }

    }) (req, res, next)     
})

// function createAuthPage(token){
//     return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>Authenticated</title>
//             <script type="text/javascript">
//                 window.opener.postMessage({
//                     command: "setToken",
//                     token: "${token}"
//                 }, "https://localhost:8080");
//                 window.close();
//             </script>
//         </head>
//         <body></body>
//     </html>

//     `
// }



module.exports = router
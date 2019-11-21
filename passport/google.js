const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const users = require('../queries/users')

passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'auth/google/callback'
},
function(accessToken, refreshToken, profile, cb) {
    // User.findorCreate({ googleId: profile.id }, function (err, user) {
    //     return cb(err, user)
    // })
    console.log(profile)
    return cb(new Error ('working on it'))
}
))
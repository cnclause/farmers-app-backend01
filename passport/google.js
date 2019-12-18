const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const users = require('../queries/users')

passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://cannect-01.herokuapp.com/auth/google/callback'
    // callbackURL: 'http://localhost:3000/auth/google/callback'
}, function(accessToken, refreshToken, profile, cb) {
    const user = formatProfile(profile)
    try {
        users.findOrCreate(user)
        return cb(null, user) 
    } catch (error) {
        return cb(error)
    }
}
))

function formatProfile(profile){
    return {
        display_name: profile.displayName,
        email: profile.emails[0].value,
        google_id: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName
    }
}
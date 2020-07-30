const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

// BCrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async(accessToken, refreshToken, profile, done) => {
                console.log(profile);
                const newPass = '123456';
                const salt = bcrypt.genSaltSync(bcryptSalt);
                const hashPass = bcrypt.hashSync(newPass, salt);


                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    image: profile.photos[0].value,
                    username: profile.given_name,
                    password: hashPass
                }

                console.log('newYuser', newUser);

                try {
                    let user = await User.findOne({ googleId: profile.id })

                    if (user) {
                        done(null, user)
                    } else {
                        user = await User.create(newUser)
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}
const express = require('express');
const router = express.Router();
const request = require('request');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const User = require('../models/user');
const Token = require('../models/token');

// BCrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

router.get('/signup', (req, res) => {
    res.render('auth/signup', { layout: false });
});

router.post('/signup', async(req, res, next) => {
    try {

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        //do some sanitaze on input ? name = name.replace(/</g, "&lt;").replace(/>/g, "&lt;");
        if (
            username === '' ||
            password === '' ||
            email === '' ||
            username.length < 3 ||
            email.length < 3 ||
            password.length < 3
        ) {
            res.render('auth/signup', {
                errorMessage: 'The length must be at least 4 characters'
            });
            return;
        }

        await User.findOne({ username: username })
            .then((user) => {
                if (user !== null) {
                    res.render('auth/signup', {
                        errorMessage: 'The username already exists!'
                    });
                    return;
                }

                const salt = bcrypt.genSaltSync(bcryptSalt);
                const hashPass = bcrypt.hashSync(password, salt);
                console.log('form pass', req.body.password)
                console.log('hashpass', hashPass)


                User.create({
                    username,
                    email,
                    password: hashPass
                }).then(() => {
                    res.redirect('/login');
                });
            })
            .catch((error) => {
                next(error);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/signup', async function(req, res, next) {
    try {
        if (
            req.body['g-recaptcha-response'] === undefined ||
            req.body['g-recaptcha-response'] === '' ||
            req.body['g-recaptcha-response'] === null
        ) {
            return res.json({ responseError: 'Please select captcha first' });
        }
        const secretKey = process.env.CAPTCHA_KEY;

        const verificationURL =
            'https://www.google.com/recaptcha/api/siteverify?secret=' +
            secretKey +
            '&response=' +
            req.body['g-recaptcha-response'] +
            '&remoteip=' +
            req.connection.remoteAddress;

        await request(verificationURL, function(error, response, body) {
            body = JSON.parse(body);

            if (body.success !== undefined && !body.success) {
                res.render('auth/signup', {
                    errorMessage: 'Failed captcha verification'
                });
                return;
            }
            // res.json({ "responseSuccess": "Success" });
            res.redirect('/login');
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/recipes');
    }
)


router.get('/login', (req, res) => {
    try {

        res.render('auth/login', {
            updatePasswordSuccessMsg: req.flash('updatePasswordSuccessMsg'),
            sendPasswordSuccessMsg: req.flash('sendPasswordSuccessMsg'),
            sendPasswordErrorMsg: req.flash('sendPasswordErrorMsg'),
            layout: false
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async(req, res, next) => {
    try {
        const theUsername = req.body.username;
        const thePassword = req.body.password;
        console.log(thePassword)

        if (theUsername === '' || thePassword === '') {
            res.render('auth/login', {
                errorMessage: 'Please enter both, username and password to sign up.'
            });
            return;
        }

        await User.findOne({ username: theUsername })
            .then((user) => {
                if (!user) {
                    res.render('auth/login', {
                        errorMessage: "The username doesn't exist."
                    });
                    return;
                }
                if (bcrypt.compareSync(thePassword, user.password)) {
                    // Save the login in the session!
                    req.session.currentUser = user;

                    console.log(user);
                    // console.log(req.session.currentUser);
                    res.redirect('/recipes');
                } else {
                    res.render('auth/login', {
                        errorMessage: 'Incorrect credentials'
                    });
                }
            })
            .catch((error) => {
                console.log('pula', error);
                next(error);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
router.get('/verify/:token', async function(req, res) {
    if (!req.params.token) {
        return res
            .status(400)
            .json({ message: 'We were unable to find a user for this token.' });
    }

    try {
        // Find a matching token
        const token = await Token.findOne({ token: req.params.token });

        if (!token) {
            return res.status(400).json({
                message: 'We were unable to find a valid token. Your token my have expired.'
            });
        }

        // If we found a token, find a matching user
        User.findOne({ _id: token.userId }, (err, user) => {
            if (!user)
                return res.status(400).json({
                    message: 'We were unable to find a user for this token.'
                });

            if (user.isVerified)
                return res
                    .status(400)
                    .json({ message: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function(err) {
                if (err) return res.status(500).json({ message: err.message });

                res.status(200).send(
                    'The account has been verified. Please log in.'
                );
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
router.post('/resend', async function(req, res) {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        console.log(user);

        if (!user)
            return res.status(401).json({
                message: 'The email address ' +
                    req.body.email +
                    ' is not associated with any account. Double-check your email address and try again.'
            });

        if (user.isVerified)
            return res.status(400).json({
                message: 'This account has already been verified. Please log in.'
            });

        await sendVerificationEmail(user, req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function sendVerificationEmail(user, req, res) {
    try {
        const token = user.generateVerificationToken();

        // Save the verification token
        await token.save();

        let subject = 'Account Verification Token';
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = 'https://cuisezone.herokuapp.com/verify/' + token.token;
        let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`;

        await sendEmail({ to, from, subject, html });

        res.status(200).json({
            message: 'A verification email has been sent to ' + user.email + '.'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

router.get('/logout', function(req, res) {
    try {
        var cookie = req.cookies;
        for (var prop in cookie) {
            var hasCookieProp = {}.hasOwnProperty.call(prop, cookie);
            if (!hasCookieProp) {
                continue;
            }
            res.cookie(prop, '', { expires: new Date(0) });
        }
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
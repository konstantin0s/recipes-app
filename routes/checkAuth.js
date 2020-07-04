const express = require('express');
const { check } = require('express-validator');

const Auth = require('../routes/auth');
const validate = require('../middlewares/validate');
const Password = require('../routes/password');

const { recover, reset, resetPassword } = ('../routes/password');
const { resendToken, verify, sendVerificationEmail } = require('../routes/auth');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).json({ message: "You are in the Auth Endpoint. Register or Login to test Authentication." });
// });


//EMAIL Verification
router.get('/verify/:token', function(req, res) {
    const User = require("../models/user");
});

router.post('/resend', function(req, res) {
    resendToken
});



router.get("/recover", (req, res) => {
    res.render("auth/recover");
});

//Password RESET
router.post('/recover', function(req, res) {
    recover
});


router.get('/reset/:token', function(req, res) {
    reset
});

router.post('/reset/:token', function(req, res) {
    [
        check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Must be at least 6 chars long'),
        check('confirmPassword', 'Passwords do not match').custom((value, { req }) => (value === req.body.password)),
    ], validate, resetPassword
});


module.exports = router;
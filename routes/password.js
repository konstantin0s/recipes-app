const express = require('express');
const User = require("../models/user");
const { sendEmail } = require('../utils/index');
const router = express.Router();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



router.get('/recover', async(req, res) => {
    res.render('recover')
})

// router.get('/reset', async(req, res) => {
//     res.render('reset')
// })

// @route POST /auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
router.post("/recover", async(req, res, next) => {
    try {
        const email = req.body.email;

        console.log('email log', email)

        const user = await User.findOne({ "email": email })
            // const user = await User.findOne({ email });

        console.log('found user', user);

        if (!user) {
            res.redirect('recover')
            return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.' });
        }

        //Generate and set password reset token
        user.generatePasswordReset();

        // Save the updated user object
        await user.save();

        // send email
        let subject = "Password change request";
        let to = user.email;
        let from = 'constantintofan85@gmail.com'
        let link = "http://localhost:5000/reset/" + user.resetPasswordToken;
        console.log(req.headers.host);
        let html = `<p>Hi ${user.username}</p>
                    <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

        await sendEmail({ to, from, subject, html });
        req.flash('sendPasswordSuccessMsg', 'A reset email has been sent to ' + user.email);
        res.redirect("/login");
        // res.status(200).json({ message: 'A reset email has been sent to ' + user.email + '.' });
    } catch (error) {
        console.log('de unde erroare?', error);
        console.log('log eerroor?', error.response.body.errors);
        res.status(500).json({ message: error.message })
    }
});

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
router.get("/reset/:token", async(req, res, next) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            // res.redirect('login');
            // return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });
        }

        //Redirect user to form with the email address
        res.render('reset', { user, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
router.post("/reset/:token", async(req, res, next) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });
        }

        //Set the new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;

        // Save the updated user object
        await user.save();

        let subject = "Your password has been changed";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let html = `<p>Hi ${user.username}</p>
                    <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

        await sendEmail({ to, from, subject, html });
        req.flash('updatePasswordSuccessMsg', 'Password updated successfully!');
        res.redirect("/login");
        // res.status(200).json({ message: 'Your password has been updated.' });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;
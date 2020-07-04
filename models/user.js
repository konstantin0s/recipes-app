const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Token = require('../models/token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    }

}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

userSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
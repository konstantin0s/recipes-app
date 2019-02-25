const express = require('express');
const router  = express.Router();


const User = require("../models/user");



router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

// router.post('/signup', (req, res) => {
//   console.log(req.body)
//   res.send('routerpost works')
// })
router.post("/signup", (req, res, next) => {
  // console.log("reqbody", req.body)
  const username = req.body.username;
  const password = req.body.password;

  if (username == "" || password == "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({"username": username})
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists!"
      });
      return;
    }


  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    username,
    password: hashPass
  })
  .then(() => {
    res.redirect("/");
  })
})
  .catch(error => {
    next(error);
  })
});

module.exports = router;
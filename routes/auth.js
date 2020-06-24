const express = require('express');
const router  = express.Router();
const request = require('request');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const User = require("../models/user");



router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

router.post("/signup", (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;


//do some sanitaze on input ? name = name.replace(/</g, "&lt;").replace(/>/g, "&lt;");
  if (username === "" || password === "" || username.length <  3 || password.length < 3) {
    res.render("auth/signup", {
      errorMessage: "The length must be at least 4 characters"
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
    res.redirect("/login");
  })
})
  .catch(error => {
    next(error);
  })
});

router.post('/signup', function(req, res) {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = process.env.CAPTCHA_KEY;

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    res.json({"responseSuccess" : "Sucess"});
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
  .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;

        // console.log(user);
        // console.log(req.session.currentUser);
        res.redirect("/recipes");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect credentials"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});

// router.get("/logout", (req, res) => {
//   res.clearCookie("name");
//   req.session.destroy((err) => {
//     // cannot access session here
//     console.log(err);
//     res.redirect("/");
//   })
// });

router.get("/logout", function(req, res){
  var cookie = req.cookies;
  for (var prop in cookie) {
    var hasCookieProp = {}.hasOwnProperty.call(prop, cookie);
      if (!hasCookieProp) {
          continue;
      }    
      res.cookie(prop, '', {expires: new Date(0)});
  }
  res.redirect('/');
})

module.exports = router;

const express = require('express');
const router  = express.Router();

const User = require("../models/user");

router.get("/signup", (req, res, next) => {
  res.render("/signup");
});


module.exports = router;
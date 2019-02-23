const express = require('express');
const router  = express.Router();

/* GET recipes page */
router.get('/recipes', (req, res, next) => {
  res.render('recipes');
});

module.exports = router;

const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');

/* GET recipes page */

router.get('/recipes', (req, res, next) => {
  Recipes.find({}, (err, recipes) => {
    if (err) {
      console.log(err);
    } else {
      res.render('recipes',
      {recipes: recipes});
    }
    
  });
});

module.exports = router;

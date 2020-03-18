const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');
let User = require('../models/user');

/* GET recipes page */
router.get('/recipes', (req, res, next) => {
  let sess = req.session;

  Recipes.find({}, (err, recipes, user) => {
    if (err) {
      console.log(err);
    } else {
      if(sess.currentUser) {
        res.render('recipes',
        {recipes: recipes, user: sess.currentUser});
    }
    }
    
  });
});


module.exports = router;

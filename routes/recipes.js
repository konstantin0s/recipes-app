const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');

/* GET recipes page */
router.get('/recipes', (req, res) => {
  let sess = req.session;

  Recipes.find({}, (err, recipes) => {
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

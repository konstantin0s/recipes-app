
const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');


router.get('/recipe/:id', function(req, res) {

  let sess = req.session;

  Recipes.findOne({_id: req.params.id}, function(err, recipe) {
    if (err) {
      console.log(err);
    } else {
      if(sess.currentUser) {
      res.render('recipe',
      {recipe: recipe, user: sess.currentUser});
      }
    }
  });
})

module.exports = router;
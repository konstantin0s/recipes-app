
const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');
const cors = require('cors');

router.get('/recipe/:id', function(req, res) {
  Recipes.findOne({_id: req.params.id}, function(err, recipe) {
    if (err) {
      console.log(err);
    } else {
      res.render('recipe',
      {recipe: recipe});
    }
  });
})

module.exports = router;
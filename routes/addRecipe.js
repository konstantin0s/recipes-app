
const express = require('express');
const router  = express.Router();
const path         = require('path');
const bodyParser   = require('body-parser');
let Recipes = require('../models/recipes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/recipes/add', function(req, res) {
  let sess = req.session;
  if(sess.currentUser) {
     res.render('add_recipes', {user: sess.currentUser});
  }
  });

   //add submit POST route
   router.post('/recipes/add', function(req, res) {

    let newRecipe = new Recipes();
    newRecipe.title = req.body.title;
    newRecipe.level = req.body.level;
    newRecipe.ingredients = req.body.ingredients;
    newRecipe.cuisine = req.body.cuisine;
    newRecipe.dishType = req.body.dishType;
    newRecipe.image = req.body.image;
    newRecipe.duration = req.body.duration;
    newRecipe.creator = req.body.creator;
    newRecipe.date = req.body.date;
 
    newRecipe.save(function(err) {
         if (err) {
           console.log(err);
           return;
         } else {
           res.redirect('/recipes');
         }
    });
   });

module.exports = router;

const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');

router.get('/recipes/add', function(req, res) {
  res.render('add_recipes');
  });

   //add submit POST route
   router.post('/recipes/add', function(req, res) {

    let celebr = new Celebrity();
    celebr.name = req.body.name;
    celebr.occupation = req.body.occupation;
    celebr.catchPhrase = req.body.catchPhrase;
 
    celebr.save(function(err) {
         if (err) {
           console.log(err);
           return;
         } else {
           res.redirect('/celebrities');
         }
    });
   });

module.exports = router;
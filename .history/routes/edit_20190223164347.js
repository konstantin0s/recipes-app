

const express = require('express');
const router  = express.Router();
const path         = require('path');
const bodyParser   = require('body-parser');
let Recipes = require('../models/recipes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



  //update submit
  router.get('/recipes/add', function(req, res) {
    res.render('add_recipes');
    });
  
     //add submit POST route
     router.post('/recipes/edit/:id', function(req, res) {
  
      let recip = {};
      recip.title = req.body.title;
      recip.level = req.body.level;
      recip.ingredients = req.body.ingredients;
      recip.cuisine = req.body.cuisine;
      recip.dishType = req.body.dishType;
      recip.image = req.body.image;
      recip.duration = req.body.duration;
      recip.creator = req.body.creator;
      recip.date = req.body.date;

      let query = { _id:req.params.id}
   
      Recipes.update(query, recip, function(err) {
           if (err) {
             console.log(err);
             return;
           } else {
             res.redirect('/recipes');
           }
      });
     });

     module.exports = router;
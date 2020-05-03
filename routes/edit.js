const express = require('express');
const router  = express.Router();
const bodyParser   = require('body-parser');
let Recipes = require('../models/recipes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


   //load edit form
   router.get('/recipe/edit/:id', function(req, res) {

    let sess = req.session;

    Recipes.findOne({_id: req.params.id}, function(err, recip) {
      if (err) {
        console.log(err);
      } else {
        if(sess.currentUser) {
          res.render('edit_recipe',
          {recip: recip, user: sess.currentUser});
        }
      }
    });
  });

  //update submit
  router.get('/recipes/add', function(req, res) {
    res.render('add_recipes');
    });
  
     //add submit POST route
     router.post('/recipes/edit/:id', function(req, res) {
  
      let recips = {};
      recips.title = req.body.title;
      recips.level = req.body.level;
      recips.ingredients = req.body.ingredients;
      recips.cuisine = req.body.cuisine;
      recips.dishType = req.body.dishType;
      newRecipe.durations = req.body.durations;
      recips.image = req.body.image;
      recips.duration = req.body.duration;
      recips.creator = req.body.creator;
      recips.date = req.body.date;

      let query = {_id: req.params.id}
   
      Recipes.updateMany(query, recips, function(err) {
           if (err) {
             console.log(err);
             return;
           } else {
             res.redirect('/recipes');
           }
      });
     });

     module.exports = router;
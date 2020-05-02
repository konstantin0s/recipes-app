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

//deserts only
router.get('/desserts', (req, res) => {
  let sess = req.session;

  Recipes.find({"dishType": "Dessert"}, (err, dessert) => {

      if (err) {
        console.log(err);
      } else {
        if(sess.currentUser) {
          res.render('dessert',
          {dessert: dessert,  user: sess.currentUser});
          console.log(dessert);
        }
      }

    });
})

//salads
router.get('/dinner', (req, res) => {
  let sess = req.session;

  Recipes.find({"dishType": "Dinner"}, (err, dinner) => {

      if (err) {
        console.log(err);
      } else {
        if(sess.currentUser) {
          res.render('dinner',
          {dinner: dinner,  user: sess.currentUser});
          console.log(dinner);
      }
    }
    });
})

router.get('/italian', (req, res) => {
  let sess = req.session;

  Recipes.find({"cuisine": "Italian"}, (err, italian) => {
      if (err) {
        console.log(err);
      } else {
        if(sess.currentUser) {
          res.render('italian',
          {italian: italian,  user: sess.currentUser});
          console.log(italian);
        }
      }
    });
})


module.exports = router;

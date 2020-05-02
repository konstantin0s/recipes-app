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
  Recipes.find({"dishType": "Dessert"}, (err, dessert) => {

      if (err) {
        console.log(err);
      } else {
          res.render('dessert',
          {dessert: dessert});
          console.log(dessert);
      }

    }
  );
})

router.get('/cuisine', (req, res) => {
  Recipes.find({"cusine": "Italian"}, (err, dessert) => {
      if (err) {
        console.log(err);
      } else {
          res.render('dessert',
          {dessert: dessert});
          console.log(dessert);
      }

    }
  );
})


module.exports = router;

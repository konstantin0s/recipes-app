const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');

/* GET recipes page */
// router.get('/recipes', (req, res, next) => {
//   res.render('recipes');
// });

// router.get('/recipes', (req, res) => {
//   Recipes.find({}, (err, foodie) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('recipes',
//       {foodie: foodie});
//     }
    
//   });
// });

module.exports = router;

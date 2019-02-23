
const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');
const cors = require('cors');


app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
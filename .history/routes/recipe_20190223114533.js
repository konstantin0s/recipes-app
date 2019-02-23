
const express = require('express');
const router  = express.Router();
let Recipes = require('../models/recipes');

router.get('/celeb/:id', function(req, res) {
  Celebrity.findOne({_id: req.params.id}, function(err, celeb) {
    if (err) {
      console.log(err);
    } else {
      res.render('celeb',
      {celeb: celeb});
    }
  });
})

module.exports = router;
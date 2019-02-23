const express = require('express');
const router  = express.Router();
const path         = require('path');
const bodyParser   = require('body-parser');
let Recipes = require('../models/recipes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

   //delete celebrity
   router.delete('/recipe/:id', function(req, res) {
    let query = {_id: req.params.id}

    Recipes.remove(query, function(err) {
      if(err) {
        console.log(err);
      }
      res.send('Success');
    })
  })



module.exports = router;
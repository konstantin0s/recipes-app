const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
let Recipes = require('../models/recipes');
const uploader = require('../models/cloudinary-setup');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/recipes/add', function(req, res) {
    let sess = req.session;
    if (sess.currentUser) {
        res.render('add_recipes', { user: sess.currentUser, layout: false });
    }
});

//add submit POST route
router.post('/recipes/add', uploader.single('image'), function(
    req,
    res,
    next
) {

    let newRecipe = new Recipes({
        title: req.body.title,
        level: req.body.level,
        ingredients: req.body.ingredients,
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        directions: req.body.directions,
        image: req.file.path,
        duration: req.body.duration,
        creator: req.body.creator,
        date: dateFormat(req.body.date)
    });


    console.log('image', newRecipe.image);

    newRecipe.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            // console.log(newRecipe)
            res.redirect('/recipes');
        }
    });
});

module.exports = router;
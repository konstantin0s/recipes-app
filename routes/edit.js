const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
let Recipes = require('../models/recipes');
const uploader = require("../models/cloudinary-setup");
const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//load edit form
router.get('/recipe/edit/:id', async function(req, res, next) {

    let sess = req.session;


    await Recipes.findOne({ _id: req.params.id }, function(err, recip) {
            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('edit_recipe', { recip: recip, user: sess.currentUser, layout: false });
                }
            }
        })
        .catch(error => {
            next(error);
        });
});

//update submit
// router.get('/recipes/add', function(req, res) {
//   res.render('add_recipes');
//   });

//add submit POST route
router.post('/recipes/edit/:id', uploader.single("image"), async function(req, res, next) {

    console.log('req file', req.file) // to see what is returned to you
    console.log('req body', req.body) // to see what is returned to you
    var imageFile = req.file.path;
    console.log('imageFile: ', imageFile);

    let recips = {};
    recips.title = req.body.title;
    recips.level = req.body.level;
    recips.ingredients = req.body.ingredients;
    recips.cuisine = req.body.cuisine;
    recips.dishType = req.body.dishType;
    recips.directions = req.body.directions;
    recips.image = req.file.path;
    recips.duration = req.body.duration;
    recips.creator = req.body.creator;
    recips.date = dateFormat(req.body.date);

    let query = { _id: req.params.id }
        // console.log(query);

    await Recipes.updateMany(query, recips, function(err) {
            if (err) {
                req.flash('updateRecipeErrorMsg', 'Something went wrong while updating recipe!');
                console.log(err);
                return;
            } else {
                console.log(recips);
                req.flash('updateRecipeSuccessMsg', 'Recipe updated successfully!');
                res.redirect(`/recipe/${query._id}`);

            }
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
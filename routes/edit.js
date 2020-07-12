const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
let Recipes = require('../models/recipes');
const uploader = require('../models/cloudinary-setup');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//load edit form
router.get('/recipe/edit/:id', async function(req, res, next) {
    try {
        let sess = req.session;

        await Recipes.findOne({ _id: req.params.id }, function(err, recip) {
            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('edit_recipe', {
                        recip: recip,
                        user: sess.currentUser,
                        layout: false
                    });
                    console.log(recip);
                }
            }
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        console.log(error);
    }
});

//update submit
router.get('/recipes/add', function(req, res) {
    res.render('add_recipes');
});

//add submit POST route
router.post('/recipe/edit/:id', uploader.single('image'), async function(
    req,
    res,
    next
) {
    try {
        //in case you don't update image, run this
        if (req.file === undefined) {
            // console.log('and what? leave me alone');
            Recipes.findOne({ _id: req.params.id }, async function(err, recip) {
                if (err) {
                    console.log(err);
                } else {
                    let recips = {};
                    recips.title = req.body.title;
                    recips.level = req.body.level;
                    recips.ingredients = req.body.ingredients;
                    recips.cuisine = req.body.cuisine;
                    recips.dishType = req.body.dishType;
                    recips.directions = req.body.directions;
                    recips.image = recip.image;
                    recips.duration = req.body.duration;
                    recips.creator = req.body.creator;
                    recips.date = dateFormat(req.body.date);

                    let query = { _id: req.params.id };
                    // console.log(query);

                    await Recipes.updateMany(query, recips, function(err) {
                        if (err) {
                            req.flash(
                                'updateRecipeErrorMsg',
                                'Something went wrong while updating recipe!'
                            );
                            console.log(err);
                            return;
                        } else {
                            console.log(recips);
                            req.flash(
                                'updateRecipeSuccessMsg',
                                'Recipe updated successfully!'
                            );
                            res.redirect(`/recipe/${query._id}`);
                        }
                    }).catch((error) => {
                        next(error);
                    });
                }
            }).catch((error) => {
                next(error);
            });
        }

        //in case you update image, run this:
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

        let query = { _id: req.params.id };
        // console.log(query);

        await Recipes.updateMany(query, recips, function(err) {
            if (err) {
                req.flash(
                    'updateRecipeErrorMsg',
                    'Something went wrong while updating recipe!'
                );
                return;
            } else {
                console.log(recips);
                req.flash('updateRecipeSuccessMsg', 'Recipe updated successfully!');
                res.redirect(`/recipe/${query._id}`);
            }
        }).catch((error) => {
            next(error);
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
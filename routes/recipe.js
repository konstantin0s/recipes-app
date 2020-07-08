const express = require('express');
const router = express.Router();
let Recipes = require('../models/recipes');


router.get('/recipe/:id', async function(req, res, next) {

    let sess = req.session;

    await Recipes.findOne({ _id: req.params.id }, function(err, recipe, ingredients) {
            if (err) {
                console.log(err);
            } else {

                string_comma = function(str) {
                    return str.trim().split(". ");
                };

                var comaaa = string_comma(recipe.ingredients)


                if (sess.currentUser) {
                    // console.log(recipe);
                    // console.log(recipe.ingredients);

                    res.render('recipe', {
                        recipe: recipe,
                        ingredients: [comaaa],
                        layout: false,
                        user: sess.currentUser,
                        updateRecipeSuccessMsg: req.flash('updateRecipeSuccessMsg'),
                        updateRecipeErrorMsg: req.flash('updateRecipeErrorMsg')
                    });
                }
            }
        })
        .catch(error => {
            next(error);
        });
})

module.exports = router;
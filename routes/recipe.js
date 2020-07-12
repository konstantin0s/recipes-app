const express = require('express');
const router = express.Router();
let Recipes = require('../models/recipes');


router.get('/recipe/:id', async function(req, res, next) {
    try {

        let sess = req.session;

        await Recipes.findOne({ _id: req.params.id }, function(err, recipe, ingredients) {
                if (err) {
                    console.log(err);
                } else {

                    string_comma = function(str) {
                        return str.trim().split(". ");
                    };

                    var stripComma = string_comma(recipe.ingredients)


                    if (sess.currentUser) {
                        res.render('recipe', {
                            recipe: recipe,
                            ingredients: [stripComma],
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
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
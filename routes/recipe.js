const express = require('express');
const router = express.Router();
let Recipes = require('../models/recipes');


router.get('/recipe/:id', async function(req, res, next) {

    let sess = req.session;

    await Recipes.findOne({ _id: req.params.id }, function(err, recipe) {
            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('recipe', {
                        recipe: recipe,
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
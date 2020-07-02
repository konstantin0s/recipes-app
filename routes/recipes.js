const express = require('express');
const router = express.Router();
let Recipes = require('../models/recipes');

/* GET recipes page */
router.get('/recipes', async(req, res, next) => {
    let sess = req.session;

    await Recipes.find({}, (err, recipes) => {
            if (err) {
                console.log(err);
            } else {

                if (sess.currentUser) {
                    res.render('recipes', { recipes: recipes, user: sess.currentUser });
                }
            }

        })
        .catch(error => {
            next(error);
        });
});

//deserts only
router.get('/desserts', (req, res) => {
    let sess = req.session;

    Recipes.find({ "dishType": "Dessert" }, (err, dessert) => {

            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('dessert', { dessert: dessert, user: sess.currentUser });
                    console.log(dessert);
                }
            }

        })
        .catch(error => {
            console.error(error);
        });
})

//dinner
router.get('/dinner', (req, res) => {
    let sess = req.session;

    Recipes.find({ "dishType": "Dinner" }, (err, dinner) => {

            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('dinner', { dinner: dinner, user: sess.currentUser });
                    console.log(dinner);
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
});

//lunch
router.get('/lunch', (req, res) => {
    let sess = req.session;

    Recipes.find({ "dishType": "Lunch" }, (err, lunch) => {

            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('lunch', { lunch: lunch, user: sess.currentUser });
                    console.log(lunch);
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
})

//italian recipes
router.get('/italian', (req, res) => {
    let sess = req.session;

    Recipes.find({ "cuisine": "Italian" }, (err, italian) => {
            if (err) {
                console.log(err);
            } else {
                if (sess.currentUser) {
                    res.render('italian', { italian: italian, user: sess.currentUser });
                    console.log(italian);
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
})


module.exports = router;
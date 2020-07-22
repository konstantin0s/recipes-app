const express = require('express');
const router = express.Router();
let Recipes = require('../models/recipes');

/* GET recipes page */
router.get('/recipes', async(req, res, next) => {
    try {
        let sess = req.session;

        await Recipes.find({}, (err, recipes) => {
                if (err) {
                    console.log(err);
                } else {

                    if (sess.currentUser) {
                        res.render('recipes', { recipes: recipes, user: sess.currentUser, layout: false });
                    }
                }

            })
            .catch(error => {
                next(error);
            });
    } catch (error) {
        console.log(error);
    }
});

//deserts only
router.get('/desserts', async(req, res, next) => {
    try {
        let sess = req.session;

        await Recipes.find({ "dishType": "Dessert" }, (err, dessert) => {

                if (err) {
                    console.log(err);
                } else {
                    if (sess.currentUser) {
                        res.render('dessert', { dessert: dessert, user: sess.currentUser, layout: false });
                        console.log(dessert);
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

//dinner
router.get('/dinner', async(req, res, next) => {
    try {
        let sess = req.session;

        await Recipes.find({ "dishType": "Dinner" }, (err, dinner) => {

                if (err) {
                    console.log(err);
                } else {
                    if (sess.currentUser) {
                        res.render('dinner', { dinner: dinner, user: sess.currentUser, layout: false });
                        console.log(dinner);
                    }
                }
            })
            .catch(error => {
                next(error);
            });
    } catch (error) {
        console.log(error);
    }
});

//lunch
router.get('/lunch', async(req, res, next) => {
    try {
        let sess = req.session;

        await Recipes.find({ "dishType": "Lunch" }, (err, lunch) => {

                if (err) {
                    console.log(err);
                } else {
                    if (sess.currentUser) {
                        res.render('lunch', { lunch: lunch, user: sess.currentUser, layout: false });
                        console.log(lunch);
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

//italian recipes
router.get('/italian', async(req, res, next) => {
    try {
        let sess = req.session;

        await Recipes.find({ "cuisine": "Italian" }, (err, italian) => {
                if (err) {
                    console.log(err);
                } else {
                    if (sess.currentUser) {
                        res.render('italian', { italian: italian, user: sess.currentUser, layout: false });
                        console.log(italian);
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
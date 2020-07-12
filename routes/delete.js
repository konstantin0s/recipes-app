const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let Recipes = require('../models/recipes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//delete celebrity
router.delete('/recipe/:id', async function(req, res, next) {
    try {
        let query = { _id: req.params.id }

        await Recipes.deleteMany(query, function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.render('recipes', { sendDeleteSucccessMsg: req.flash('sendDeleteSucccessMsg') })
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
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let Recipes = require('../models/recipes');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//delete celebrity
router.delete('/recipe/:id', async function(req, res, next) {
    let query = { _id: req.params.id }

    await Recipes.deleteMany(query, function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                res.sendStatus(200);
            }
        })
        .catch(error => {
            next(error);
        })
})



module.exports = router;
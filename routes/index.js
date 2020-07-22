const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
    try {
        res.render('index', { layout: false });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
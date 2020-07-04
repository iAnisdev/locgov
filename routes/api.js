var express = require('express');
var router = express.Router();
const request = require('request');

/* search page */
router.get('/search', function(req, res, next) {
    request(`https://www.loc.gov/search?q=${req.query.q}&fo=json&sp=${req.query.sp}`, function (error, response, body) {
        res.json(JSON.parse(body))
    });
});

router.get('/collections', function(req, res, next) {
    request(`https://www.loc.gov/collections?c=50&fo=json`, function (error, response, body) {
        res.json(JSON.parse(body))
    });
});

router.get('/collections/:name', function(req, res, next) {
    request(`https://www.loc.gov/collections/${req.params.name}?fo=json&sp=${req.query.sp}`, function (error, response, body) {
        res.json(JSON.parse(body))
    });
});

module.exports = router;

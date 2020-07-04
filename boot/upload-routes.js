var express = require('express');
const multureConfig = require('../config/multer')
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')

/* search route */
router.post('/upload', multureConfig.saveToUploads,  function(req, res, next) {
    let base64String = req.body.fileData
    let base64File = base64String.split(';base64,').pop();
    fs.writeFile('./uploads/data.csv', base64File, {encoding: 'base64'}, function(err) {
        const results = [];
        fs.createReadStream('./uploads/data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results)
        });
    });
});

module.exports = router;

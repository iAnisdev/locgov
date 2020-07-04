var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const cors = require('cors')


var apiRouter = require('./routes/api');

var app = express();

/* CORS allowed */
app.use(cors())

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1/api', apiRouter );

// Handle SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));



module.exports = app;

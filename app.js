/**
 * Main entry for the API.
 * Starts the server.
 */

// Dependencies
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var v1Router = require('./v1');

var app = express();

app.set('json spaces', 2); // Pretty print json output
app.use(compression()); // Use gzip compressiom
app.use(bodyParser()); // Parse queries and body

// Versions
app.use('/v1', v1Router);

// Redirect root to documentation
app.get('/', function(req, res) {
    res.redirect('https://developer.dansksupermarked.dk');
});

// Catch 404 pages not cached in routers
app.use(function(req, res) {
    res.send(404, 'Not a valid version of the API. See https://developer.dansksupermarked.dk for more info.');
});

var port = process.env.port || '3000';
console.log('App listening on port ' + port);
module.exports = app.listen(port);

// Dependencies
var express = require('express');
var app = module.exports = express();
var lazy = require('lazy.js');


////////////////////
// BEFORE SERVICE //
////////////////////

// Start runtime timer
app.use(require('./utils/runtime').start);

// Use gzip compressiom
app.use(require('compression')());

// Parse queries and body
app.use(require('body-parser')());

// Allow cors
app.all('*', require('./utils/cors'));

// Check for authentication
app.use(require('./utils/authentication'));

// Check if user has authorazation to given resource with method
app.all('/:resource/*', require('./utils/authorazation'));

// Rate limit user
app.all('*', require('./utils/rate-limiting'));

// Check if request is cached
// app.get('*', require('./utils/caching').getFromCache);


//////////////
// SERVICES //
//////////////

// Resources
require('./resources/stores')(app);


////////////////////
// AFTER SERVICES //
////////////////////

// Total count in response header
app.get('*', require('./utils/total-count'));

// Prepare payload transform with lazy.js
app.get('*', function(req, res, next) {
    req.payloadIsArray = Array.isArray(req.payload);
    req.payload = lazy(req.payload);
    next();
});

// Filters
app.get('*', require('./utils/filter'));

// Sort based on `sort` query
app.get('*', require('./utils/sort'));

// Paginate result
app.get('*', require('./utils/pagination'));

// Limit fields based on `limit` query
app.get('*', require('./utils/limit-fields'));

// Lazy.js payload to normal type
app.get('*', function(req, res, next) {
    if (req.payloadIsArray) {
        req.payload = req.payload.toArray();
    } else {
        req.payload = req.payload.toObject();
    }
    next();
});

// Save to cache
// app.get('*', require('./utils/caching').saveToCache);

// Add headers to response for use with AJAX calls
app.use(require('./utils/expose-headers-to-ajax-calls'));

// End time for runtime
app.use(require('./utils/runtime').end);

// Response to client
app.use(function(req, res) {
    if (!req.status) {
        return res.status(404).json({
            error: 'Resource not found'
        });
    }
    return res.json(req.status, req.payload);
});

console.log('App listening on port 3000');
app.listen(3000);

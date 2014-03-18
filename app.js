// External dependencies
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');

// Internal dependencies
var runtime = require('./utils/runtime');
var cors = require('./utils/cors');
var exposeHeaders = require('./utils/expose-headers');
var authentication = require('./utils/authentication');
var authorization = require('./utils/authorization');
var rateLimit = require('./utils/rate-limiting');
var caching = require('./utils/caching');
var totalCount = require('./utils/total-count');
var lazyChain = require('./utils/lazy-chain');
var filter = require('./utils/filter');
var sort = require('./utils/sort');
var pagination = require('./utils/pagination');
var limitFields = require('./utils/limit-fields');
var exposeHeaders = require('./utils/expose-headers');
var response = require('./utils/response');

// Create express server app
var app = module.exports = express();
app.set('json spaces', 2); // Pretty print json output

// Handle request
app.use(runtime.start); // Start runtime timer
app.use(compression()); // Use gzip compression
app.use(bodyParser()); // Parse queries and body
app.use(cors); // Allow CORS
app.use(exposeHeaders); // Add headers to response for use with AJAX calls
app.use(authentication); // Check for authentication
app.all('/v1/:resource/*', authorization); // Check if user has authorization to given resource and method
app.use(rateLimit); // Rate limit user
app.get('*', caching.getFromCache); // Check if request is cached

// Handle routing and data retrieval
require('./resources/stores')(app);

// Handle response
app.get('*', totalCount); // Total count in response header
app.get('*', lazyChain.start); // Prepare payload transform with lazy.js
app.get('*', filter); // Apply filters
app.get('*', sort); // Sort based on `sort` query
app.get('*', pagination); // Paginate result
app.get('*', limitFields); // Limit fields based on `limit` query
app.get('*', lazyChain.end); // Evaluate lazy.js chain
app.get('*', caching.saveToCache); // Save request cache
app.use(exposeHeaders); // Add headers to response for use with AJAX calls
app.use(runtime.end); // Add runtime to header

// Send response to client
app.use(response.send);

console.log('App listening on port 3000');
app.listen(3000);

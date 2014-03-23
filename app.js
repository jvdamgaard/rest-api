// Dependencies
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var isSSL = require('./utils/is-ssl.js');
var runtime = require('./utils/runtime');
var cors = require('./utils/cors');
var exposeHeaders = require('./utils/expose-headers');
var transformOutput = require('./utils/transform-output');
var storesRouter = require('./routers/stores');
var notFound = require('./utils/not-found');
var config = require('./utils/config.js');
var authentication = require('./utils/authentication');
var authorization = require('./utils/authorization');
var rateLimit = require('./utils/rate-limiting');
var caching = require('./utils/caching');
var totalCount = require('./utils/total-count');
var lazyChain = require('./utils/lazy-chain');
var resourceMethods = require('./utils/resource-methods');
var filter = require('./utils/filter');
var sort = require('./utils/sort');
var pagination = require('./utils/pagination');
var limitFields = require('./utils/limit-fields');
var exposeHeaders = require('./utils/expose-headers');

var app = module.exports = express();

app.set('json spaces', 2); // Pretty print json output
app.use(compression()); // Use gzip compressiom
app.use(bodyParser()); // Parse queries and body

app.use(isSSL); // Fail if the HTTPS protocol is not used
app.use(runtime.start); // Start runtime timer
app.use(cors); // Allow CORS
app.use(exposeHeaders); // Add headers to response for use with AJAX calls
app.all('/v1/:resource*', config);
app.all('/v1/:resource*', authentication); // Check for authentication
app.all('/v1/:resource*', authorization); // Check if user has authorization to given resource and method
app.use(rateLimit); // Rate limit user
app.get('*', caching.getFromCache); // Check if request is cached

// Get data from services
app.use('/v1/stores', storesRouter); // Stores resource

// Handle response
app.get('/v1/*', totalCount); // Total count in response header
app.get('/v1/*', lazyChain.start); // Prepare payload transform with lazy.js
app.get('/v1/*', resourceMethods); // Apply filters
app.get('/v1/*', filter); // Apply filters
app.get('/v1/*', sort); // Sort based on `sort` query
app.get('/v1/*', pagination); // Paginate result
app.get('/v1/*', limitFields); // Limit fields based on `limit` query
app.get('/v1/*', lazyChain.end); // Evaluate lazy.js chain
app.get('/v1/*', caching.saveToCache); // Save request cache
app.use(runtime.end); // Add runtime to header

// Transform payload and status to a response
app.use(notFound);
app.use(transformOutput);

var port = process.env.port || '3000';
console.log('App listening on port ' + port);

module.exports = app.listen(port);

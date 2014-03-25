/**
 * Router for version 1 of the api.
 * Orchestrate all express middlewares for the API.
 *
 * ## Example of usage
 *
 *     var app = express();
 *     app.use('/v1', v1Router);
 */

// Dependencies
var express = require('express');
var isSSL = require('../utils/is-ssl.js');
var runtime = require('../utils/runtime');
var cors = require('../utils/cors');
var exposeHeaders = require('../utils/expose-headers');
var transformOutput = require('../utils/transform-output');
var notFound = require('../utils/not-found');
var stores = require('./stores');
var authentication = require('../utils/authentication');
var authorization = require('../utils/authorization');
var rateLimit = require('../utils/rate-limiting');
var caching = require('../utils/caching');
var totalCount = require('../utils/total-count');
var lazyChain = require('../utils/lazy-chain');
var resourceMethods = require('../utils/resource-methods');
var filter = require('../utils/filter');
var sort = require('../utils/sort');
var pagination = require('../utils/pagination');
var limitFields = require('../utils/limit-fields');

// Create express router
var router = module.exports = express.Router();

// Handle request
router.use(isSSL); // Fail if the HTTPS protocol is not used
router.use(runtime.start); // Start runtime timer
router.use(cors); // Allow CORS
router.use(exposeHeaders); // Add headers to response for use with AJAX calls
router.all('/:resource*', authentication); // Check for authentication
router.all('/:resource*', authorization); // Check if user has authorization to given resource and method
router.use(rateLimit); // Rate limit user
router.get('/*', caching.getFromCache); // Check if request is cached

// Get data
router.use('/stores', stores); // Stores resource

// Handle data
router.get('/*', lazyChain.start); // Prepare payload transform with lazy.js
router.get('/*', totalCount); // Total count in response header
router.get('/*', resourceMethods); // Apply filters
router.get('/*', filter); // Apply filters
router.get('/*', sort); // Sort based on `sort` query
router.get('/*', pagination); // Paginate result
router.get('/*', limitFields); // Limit fields based on `limit` query
router.get('/*', lazyChain.end); // Evaluate lazy.js chain
router.get('/*', caching.saveToCache); // Save request cache
router.use(runtime.end); // Set X-Runtime headers
router.use(notFound); // Check if any resource has been found for request
router.use(transformOutput); // Transform payload and respond to client

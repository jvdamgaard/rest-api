/**
 * Expose headers to ajax calls.
 *
 * ## Example
 *
 *     var app = require('express');
 *     app.use(exposeHeaders);
 */

var exposeHeaders = [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Total-Count',
    'X-Runtime',
    'Link'
].join(', ');

/**
 * Express middleware
 * @param         {object}          req         Express request
 * @param         {object}          res         Express response
 * @param         {Function}        next        Callback
 * @return        {void}
 */
module.exports = function(req, res, next) {
    res.setHeader('Access-Control-Expose-Headers', exposeHeaders);
    next();
};

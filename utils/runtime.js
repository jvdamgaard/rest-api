/**
 * Set a header that indicates how long time it took for the server to make the
 * response.
 *
 * ## Example
 *
 *     var app = require('express');
 *     app.use(runtime.start);
 *     // Perform a lot of express tasks
 *     app.use(runtime.end);
 */

/**
 * Set the runtime start date
 * @param         {object}          req         Express request
 * @param         {object}          res         Express response
 * @param         {Function}        next        Callback
 * @return        {void}
 */
module.exports.start = function(req, res, next) {
    req.runtimeStart = new Date().getTime();
    next();
};

/**
 * Set X-Runtime header on response
 * @param         {object}          req         Express request
 * @param         {objext}          res         Express response
 * @param         {Function}        next        Callback
 * @return        {void}
 */
module.exports.end = function(req, res, next) {
    var now = new Date().getTime();
    res.setHeader('X-Runtime', now - req.runtimeStart);
    next();
};

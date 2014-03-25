/**
 * Check if the requested url is encrypted (SSL - HTTPS).
 *
 * ## Example
 *
 *     var app = require('express');
 *     app.use(isSSL);
 */

// Dependencies
var error = require('./error-handler');

/**
 * Express middleware
 * @param         {object}          req         Express request
 * @param         {object}          res         Express response
 * @param         {Function}        next        Callback
 * @return        {void}
 */
module.exports = function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.connection.encrypted) {
        return error(req, res, {
            code: '-1',
            developerMessage: 'Request needs to be through the https protocol'
        });
    }
    next();
};

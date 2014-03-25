/**
 * Redirects to error if nothing has been found for given url.
 *
 * ## Example
 *
 *     var app = require('express');
 *     app.use(notFound);
 */

// Dependencies
var errorHandler = require('./error-handler');

module.exports = function(req, res, next) {
    if (!req.status) {
        return errorHandler(req, res, {
            code: '-1',
            developerMessage: 'This resource does not exist'
        });
    }
    next();
};

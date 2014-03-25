/**
 * Transform output to a standard and respond to client.
 *
 * ## Example
 *
 *     var app = require('express');
 *     app.use(transformOutput);
 */

/**
 * Express middleware
 * @param         {object}        req        Express request
 * @param         {object}        res        Express response
 * @return        {void}
 */
module.exports = function(req, res) {
    return res.json(req.status, req.payload);
};

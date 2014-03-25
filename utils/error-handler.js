/**
 * Break express chain with an error.
 *
 * ## Example
 *
 *     errorHandler(req, res, {
 *         code: '1234',
 *         developerMessage: 'This is the message to a developer of how to fix the problem',
 *         userMessage: 'This is a kind message to the end user'
 *     });
 */

// Dependencies
var lazy = require('lazy.js');
var transformOutput = require('./transform-output');
var errorCodes = require('../data/error-codes'); // TODO: Replace with a service

/**
 * Find info for error code
 * @param         {string|integer}    code        Error code
 * @return        {object}                        Full info for error code
 */
var errorCodeLookUp = function(code) {
    var errorData = lazy(errorCodes).findWhere({
        code: code
    });
    if (errorData) {
        return errorData;
    }

    // If no error with given code exists, then return standard response
    return lazy(errorCodes).findWhere({
        code: '-1'
    });
};

/**
 * Receive error, transform to valid error and send to response
 * @param         {object}        req                      Express request
 * @param         {object}        res                      Express response
 * @param         {object}        error                    Description of the error
 * @param         {string}        error.code               Code corresponding to the error
 * @param         {[string]}      error.developerMessage   Description of the error to the developer
 * @param         {[string]}      error.userMessage        Description of the error to the user
 * @return        {void}
 */
module.exports = function(req, res, error) {
    error = error || {};
    var errorData = errorCodeLookUp(error.code);
    error.code = errorData.code;
    error.developerMessage = error.developerMessage || errorData.developerMessage;
    error.userMessage = error.userMessage || errorData.userMessage;
    error.moreInfo = errorData.moreInfo;
    req.payload = error;

    req.status = errorData.statusCode;

    transformOutput(req, res);
};

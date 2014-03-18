var lazy = require('lazy.js');

module.exports.start = function(req, res, next) {
    req.payloadIsArray = Array.isArray(req.payload);
    req.payload = lazy(req.payload);
    next();
};

module.exports.end = function(req, res, next) {
    if (req.payloadIsArray) {
        req.payload = req.payload.toArray();
    } else {
        req.payload = req.payload.toObject();
    }
    next();
};

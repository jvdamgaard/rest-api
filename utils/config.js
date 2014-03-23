var config = require('../config');

module.exports = function(req, res, next) {
    var resource = req.params.resource;
    if (resource && config[resource]) {
        req.config = config[resource];
    }
    next();
};

module.exports.isActive = function(req, type) {
    if (!req.payloadIsArray) {
        return false;
    }
    if (!req.config || !req.config.response) {
        return false;
    }
    if (req.config.response[type] === false) {
        return false;
    }
    return true;
};

var config = require('../config');

module.exports = function(req, res, next) {
    var resource = req.params.resource;
    if (resource && config[resource]) {
        req.config = config[resource];
    }
    next();
};

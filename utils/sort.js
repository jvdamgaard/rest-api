module.exports = function(req, res, next) {
    if (!req.query.sort || !req.payloadIsArray || !req.config || !req.config.response || !req.config.response.sort) {
        return next();
    }
    var sort = req.query.sort;
    var desc = req.query.sort.indexOf('-') === 0;
    if (desc) {
        sort = sort.replace('-', '');
    }
    req.payload = req.payload.sortBy(function(item) {
        return item[sort];
    });

    if (desc) {
        req.payload = req.payload.reverse();
    }
    next();
};

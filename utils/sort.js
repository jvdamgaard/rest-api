// Dependencies

module.exports = function(req, res, next) {

    if (!req.payloadIsArray) {
        return next();
    }

    var sort = req.query.sort;
    if (!sort) {
        return next();
    }
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

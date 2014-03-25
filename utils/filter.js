// Dependencies

module.exports = function(req, res, next) {
    var filters;
    var i;

    if (!req.payloadIsArray) {
        return next();
    }

    req.payload = req.payload.filter(function(item) {

        // Find filters
        if (!filters) {
            filters = [];
            for (var query in req.query) {
                if (item[query]) {
                    filters.push(query);
                }
            }
        }
        var inFilter = true;

        // Find non-matching items
        for (i = filters.length - 1; i >= 0; i--) {
            var filter = filters[i];
            // TODO: gt, lt
            if (item[filter].toString() !== req.query[filter]) {
                inFilter = false;
                break;
            }
        }
        return inFilter;
    });
    next();
};

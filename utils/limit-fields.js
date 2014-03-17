module.exports = function(req, res, next) {
    if (!req.query.fields) {
        return next();
    }
    var fields = req.query.fields.split(',');
    req.payload = req.payload.map(function(item) {
        var limitedItem = {
            id: item.id
        };
        for (var i = 0, len = fields.length; i < len; i++) {
            var field = fields[i];
            if (item[field]) {
                limitedItem[field] = item[field];
            }
        }
        return limitedItem;
    });
    next();
};

module.exports.start = function(req, res, next) {
    req.runtimeStart = new Date().getTime();
    next();
};

module.exports.end = function(req, res, next) {
    var now = new Date().getTime();
    res.setHeader('X-Runtime', now - req.runtimeStart);
    next();
};

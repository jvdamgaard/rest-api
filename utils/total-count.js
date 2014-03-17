module.exports = function(req, res, next) {
    if (req.payload && req.payload.length) {
        res.setHeader('X-Total-Count', req.payload.length);
    }
    next();
};

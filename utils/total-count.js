module.exports = function(req, res, next) {

    if (req.payloadIsArray) {
        res.setHeader('X-Total-Count', req.payload.size());
    }
    next();
};

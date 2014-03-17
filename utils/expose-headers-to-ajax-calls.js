module.exports = function(req, res, next) {
    res.setHeader('Access-Control-Expose-Headers', 'X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,X-Total-Count,Link');
    next();
};

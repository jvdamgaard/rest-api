var exposeHeaders = [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'X-Total-Count',
    'X-Runtime',
    'Link'
].join(', ');

module.exports = function(req, res, next) {
    res.setHeader('Access-Control-Expose-Headers', exposeHeaders);
    next();
};

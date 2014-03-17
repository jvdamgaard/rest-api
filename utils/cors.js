module.exports = function(req, res, next) {

    // var user = req.user;

    // TODO: set based on user
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if ('OPTIONS' === req.method) {
        return res.send(200);
    }
    next();
};

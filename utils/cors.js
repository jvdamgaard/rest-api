module.exports = function(req, res, next) {

    // var user = req.user;

    // TODO: set based on user
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authentication, Content-Type');
    if ('OPTIONS' === req.method) {
        return res.send(200);
    }
    next();
};

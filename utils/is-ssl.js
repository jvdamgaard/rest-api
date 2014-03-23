var error = require('./error-handler');

module.exports = function(req, res, next) {
    if (process.env.NODE_ENV === 'production' && !req.connection.encrypted) {
        return error(req, res, {
            code: '-1',
            developerMessage: 'Request needs to be through the https protocol'
        });
    }
    next();
};

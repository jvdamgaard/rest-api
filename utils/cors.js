/**
 * Add CORS to the server
 *
 * ## Example of use:
 *
 *     var app = express();
 *     app.use(cors);
 */

/**
 * Express middleware
 * @param         {object}          req         Express request
 * @param         {object}          res         Express response
 * @param         {Function}        next        callback
 * @return        {void}
 */
module.exports = function(req, res, next) {
    // TODO: set allow-origin based on user
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authentication, Content-Type');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    }
    next();
};

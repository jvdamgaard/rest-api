// Mock data
var stores = require('./mock-data.json');

// Dependencies
var lazy = require('lazy.js');

module.exports = function(app) {

    app.get('/v1/stores', function(req, res, next) {
        req.status = 200;
        req.payload = stores;
        next();
    });

    app.get('/v1/stores/:id', function(req, res, next) {
        var store = lazy(stores).findWhere({
            id: req.params.id
        });
        if (!store) {
            res.status(400).json({
                error: 'Invalid ID'
            });
        }
        req.status = 200;
        req.payload = store;
        next();
    });

};

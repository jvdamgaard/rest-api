// Dependencies
var express = require('express');
var lazy = require('lazy.js');
var error = require('../utils/error-handler');

var stores = module.exports = express.Router();

// Mock data
var storesData = require('../test/mock/data/stores.json');

stores.get('/', function(req, res, next) {
    req.status = 200;
    req.payload = storesData;
    next();
});

stores.get('/:id', function(req, res, next) {
    var storeData = lazy(storesData).findWhere({
        id: req.params.id
    });
    if (!storeData) {
        return error(req, res, {
            code: '-1',
            developerMessage: 'Invalid Id for stores'
        });
    }
    req.status = 200;
    req.payload = storeData;
    next();
});

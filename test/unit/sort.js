// Test framework dependencies
var expect = require('chai').expect;
var lazy = require('lazy.js');
// var sinon = require('sinon');
// var supertest = require('supertest');
// var app = require('../../app');
// var api = supertest(app);

// Source for test
var sort = require('../../utils/sort');

// Mock data
var stores = require('../mock/data/stores.json');

describe('utils/sort', function() {
    it('should sort the payload based on a `sort` querystring', function(done) {
        var req = {
            payload: lazy(stores),
            payloadIsArray: true,
            query: {
                sort: 'id'
            },
            config: {
                response: {
                    sort: true
                }
            }
        };
        sort(req, null, function() {
            expect(req.payload).not.to.be.empty;
            var sorted = req.payload.toArray();
            expect(sorted).to.be.an('array');
            done();
        });
    });
});

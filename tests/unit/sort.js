// Test framework dependencies
var expect = require('chai').expect;
// var sinon = require('sinon');
// var supertest = require('supertest');
// var app = require('../../index');
// var api = supertest(app);

// Source for test
var sort = require('../../utils/sort');

// Mock data
var stores = require('../mock-data/stores');

describe('utils/sort', function() {
    it('should sort the payload based on a `sort` querystring', function(done) {
        var req = {
            payload: stores,
            query: {
                sort: 'id'
            }
        };
        sort(req, null, function() {
            expect(req.payload).be.an.array;
            done();
        });
    });
});

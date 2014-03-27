/**
 * Test for filtering array payload
 */

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var lazy = require('lazy.js');
var filter = require('../../utils/filter');
var stores = require('../mock/data/stores.json');

describe('Filter', function() {
    var res = {};
    var req = {
        query: {
            filter: null
        }
    };
    var next;

    beforeEach(function() {
        req.payload = lazy(stores);
        next = sinon.spy();
    });

    it('should pass on if payload is not an array', function() {
        var payloadSizeBefore = req.payload.size();
        req.payloadIsArray = false;
        filter(req, res, next);
        expect(next.called).to.be.true;
        expect(req.payload.size()).to.equal(payloadSizeBefore);
    });

    it('should pass on if payload is not an array', function() {
        var payloadSizeBefore = req.payload.size();
        req.payloadIsArray = true;
        req.query.postal = '8000';
        filter(req, res, next);
        expect(next.called).to.be.true;
        expect(req.payload.size()).to.be.lessThan(payloadSizeBefore);
    });

});

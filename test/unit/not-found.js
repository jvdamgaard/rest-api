/**
 * Tests for not found resources
 */

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var notFound = require('../../utils/not-found');

describe('Not found', function() {

    var req = {
        status: null,
        payload: null
    };
    var res = {};
    var next;

    beforeEach(function() {
        res.json = sinon.spy();
        next = sinon.spy();
    });

    it('should stop chain and send error when status is not present', function() {
        req.status = null;
        notFound(req, res, next);
        expect(res.json.called).to.be.true;
        expect(next.called).to.be.false;
        expect(req.status).to.equal(404);
    });

    it('should pass on when status in present', function() {
        req.status = 200;
        notFound(req, res, next);
        expect(res.json.called).to.be.false;
        expect(next.called).to.be.true;
        expect(req.status).to.equal(200);
    });

});

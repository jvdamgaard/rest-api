/**
 * Test for SLL certificat (https) requests
 */

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var isSSL = require('../../utils/is-ssl');

describe('Check SSL certificat', function() {

    var req = {
        status: null,
        payload: null,
        connection: {
            encrypted: false
        }
    };
    var res = {};
    var next;
    var env = process.env.NODE_ENV;

    before(function() {
        process.env.NODE_ENV = 'production';
    });

    after(function() {
        process.env.NODE_ENV = env;
    });

    beforeEach(function() {
        res.json = sinon.spy();
        next = sinon.spy();
    });

    it('should return an error for non-encrypted request', function() {
        req.connection.encrypted = false;
        isSSL(req, res, next);
        expect(res.json.called).to.be.true;
        expect(next.called).to.be.false;
        expect(req.status).to.equal(404);
    });

    it('should pass on for encrypted request', function() {
        req.connection.encrypted = true;
        isSSL(req, res, next);
        expect(res.json.called).to.be.false;
        expect(next.called).to.be.true;
    });

});

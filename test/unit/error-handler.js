/**
 * Test for error handling
 */

// Dependencies
var expect = require('chai').expect;
var sinon = require('sinon');
var errorHandler = require('../../utils/error-handler');

describe('Error Handler', function() {
    var req = {
        status: null,
        payload: null
    };

    it('should respond with an error', function() {
        var res = {
            json: sinon.spy()
        };
        errorHandler(req, res);
        expect(res.json.called).to.be.true;
        expect(req.payload).to.contain.key('code').and.not.be.empty;
        expect(req.payload).to.contain.key('developerMessage').and.not.be.empty;
        expect(req.payload).to.contain.key('userMessage').and.not.be.empty;
        expect(req.payload).to.contain.key('moreInfo').and.not.be.empty;
    });

    it('should respond with the right error given an error', function() {
        var res = {
            json: sinon.spy()
        };
        var error = {
            developerMessage: 'Some developer message',
            userMessage: 'Some user message',
        };
        errorHandler(req, res, error);
        expect(req.payload.developerMessage).to.equal(error.developerMessage);
        expect(req.payload.userMessage).to.equal(error.userMessage);
    });

    it('should fall back to default status code and more info if invalid error code is given', function() {
        var res = {
            json: sinon.spy()
        };
        var error = {
            code: '-2'
        };
        errorHandler(req, res, error);
        expect(req.payload.code).to.equal('-1');
    });

});

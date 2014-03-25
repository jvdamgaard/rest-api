/**
 * Tests for the stores router
 */

// Dependencies
var expect = require('chai').expect;
var supertest = require('supertest');

describe('Stores', function() {

    var server = require('../../app');
    var api = supertest(server);

    after(function() {
        server.close();
    });

    describe('GET /v1/stores', function() {

        it('should respond with an array of stores as JSON', function(done) {
            api.get('/v1/stores').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.headers).to.have.property('content-type').and.include('json');
                expect(res.body).to.be.an('array').and.not.empty;
                done();
            });
        });
    });

    describe('GET /v1/stores/:id', function() {

        it('should respond with a stores object as JSON', function(done) {
            api.get('/v1/stores/530758bbbe150fc51e6cfbda').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.headers).to.have.property('content-type').and.include('json');
                expect(res.body).to.be.an('object').and.have.property('id');
                done();
            });
        });

        it('should respond with an error given an invalid id', function(done) {
            api.get('/v1/stores/not-a-valid-id').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(404);
                expect(res.headers).to.have.property('content-type').and.include('json');
                expect(res.body).to.be.an('object').and.not.empty;
                done();
            });
        });
    });

});

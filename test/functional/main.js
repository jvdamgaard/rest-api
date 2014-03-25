/**
 * Test behaviour outside of the routes.
 */

// Dependencies
var expect = require('chai').expect;
var supertest = require('supertest');

describe('Main', function() {

    var server = require('../../app');
    var api = supertest(server);

    after(function() {
        server.close();
    });

    describe('GET /', function() {

        it('should redirect to documentation site', function(done) {
            api.get('/').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(302);
                expect(res.headers).to.have.property('location', 'https://developer.dansksupermarked.dk');
                done();
            });
        });
    });

    describe('GET /not-a-valid-version', function() {

        it('should respond with an "page not found" error', function(done) {
            api.get('/not-a-valid-version').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(404);
                done();
            });
        });
    });

});

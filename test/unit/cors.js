/**
 * Test for compatibility with CORS
 */

// Dependencies
var expect = require('chai').expect;
var supertest = require('supertest');
var express = require('express');
var cors = require('../../utils/cors');

describe('CORS', function() {

    var app = express();
    app.use(cors);
    var server = app.listen(3000);
    var api = supertest(server);

    after(function() {
        server.close();
    });

    describe('GET /', function() {

        it('should set headers on response', function(done) {
            api.get('/').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.headers).to.have.property('access-control-allow-origin', '*');
                expect(res.headers).to.have.property('access-control-allow-methods', 'GET, POST, PUT, DELETE');
                expect(res.headers).to.have.property('access-control-allow-headers', 'X-Requested-With, Authentication, Content-Type');
                done();
            });
        });

    });

    describe('OPTIONS /', function() {

        it('should respond with a 200', function(done) {
            api.options('/').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

    });

});

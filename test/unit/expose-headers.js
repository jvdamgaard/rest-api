/**
 * Test for exposed headers
 */

// Dependencies
var expect = require('chai').expect;
var supertest = require('supertest');
var express = require('express');
var exposeHeaders = require('../../utils/expose-headers');

describe('Expose headers', function() {

    var app = express();
    app.use(exposeHeaders);
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
                expect(res.headers).to.have.property('access-control-expose-headers', 'X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-Total-Count, X-Runtime, Link');
                done();
            });
        });

    });

});

/**
 * Test for runtime header
 */

// Dependencies
var expect = require('chai').expect;
var supertest = require('supertest');
var express = require('express');
var runtime = require('../../utils/runtime');

describe('Runtime', function() {

    var app = express();
    app.use(runtime.start);
    app.use(function(req, res, next) {
        setTimeout(function() {
            next();
        }, 3);
    });
    app.use(runtime.end);
    var server = app.listen(3000);
    var api = supertest(server);

    after(function() {
        server.close();
    });

    describe('GET /', function() {

        it('should set header on response', function(done) {
            api.get('/').end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.headers).to.have.property('x-runtime').and.be.closeTo(3, 1);
                done();
            });
        });

    });

});

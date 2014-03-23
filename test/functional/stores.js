// Test framework dependencies
var expect = require('chai').expect;
// var sinon = require('sinon');
var supertest = require('supertest');
var app = require('../../app');
var api = supertest(app);

describe('GET /stores', function() {

    after(function() {
        app.close();
    });

    it('should return an array of stores', function(done) {
        api.get('/v1/stores')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(30);
                done();
            });
    });
});

describe('GET /stores:id', function() {

    after(function() {
        app.close();
    });

    it('should return object given an id', function(done) {
        api.get('/v1/stores/530758bbbe150fc51e6cfbda')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should return 400 given a invalid id', function(done) {
        api.get('/v1/stores/not-a-valid-id')
            .expect(400)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('object');
                done();
            });
    });
});

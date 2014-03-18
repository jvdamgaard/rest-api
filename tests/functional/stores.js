// Test framework dependencies
var expect = require('chai').expect;
// var sinon = require('sinon');
var supertest = require('supertest');
var api = supertest(require('../../app'));

describe('GET /stores', function() {

    it('returns array of stores as JSON', function(done) {
        api.get('/v1/stores')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an.array;
                expect(res.body).to.have.length(30);
                done();
            });
    });
});

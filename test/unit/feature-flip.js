/**
 * Test for Feature Flip
 */

// Dependencies
var expect = require('chai').expect;
var feature = require('../../utils/feature-flip');

describe('Feature Flip', function() {

    describe('feature({name}).isEnabled', function() {
        var env = process.env.NODE_ENV;

        afterEach(function() {
            process.env.NODE_ENV = env;
        });

        it('should disable all features not listen in configuration', function() {
            process.env.NODE_ENV = 'production';
            expect(feature('not-a-valid-feature').isEnabled).to.be.false;
        });

        it('should enable all features on build server', function() {
            process.env.NODE_ENV = 'build';
            expect(feature('not-a-valid-feature').isEnabled).to.be.true;
        });

        it('should return the status of features', function() {
            process.env.NODE_ENV = 'production';
            feature.enable('test-feature');
            expect(feature('test-feature').isEnabled).to.be.true;

            feature.disable('test-feature');
            expect(feature('test-feature').isEnabled).to.be.false;
        });

    });

});

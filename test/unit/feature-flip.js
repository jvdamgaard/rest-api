/**
 * Test for Feature Flip
 */

// Dependencies
var expect = require('chai').expect;
var feature = require('../../utils/feature-flip');

describe('Feature Flip', function() {

    describe('feature({name}).isEnabled', function() {

        var status;

        before(function() {
            status = feature('test-feature').isEnabled;
        });

        before(function() {
            if (status) {
                feature.enable('test-feature');
            } else {
                feature.disable('test-feature');
            }
        });

        it('should disable all features not listen in configuration', function() {
            expect(feature('not-a-valid-feature').isEnabled).to.be.false;
        });

        it('should return the status of features', function() {
            feature.enable('test-feature');
            expect(feature('test-feature').isEnabled).to.be.true;

            feature.disable('test-feature');
            expect(feature('test-feature').isEnabled).to.be.false;
        });

    });

});

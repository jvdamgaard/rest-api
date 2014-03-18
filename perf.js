/**
 * Test performance on data manipulation after data has been received from
 * services
 */

console.log('Starting test...');

// Test data
var stores = require('./tests/mock-data/stores.json');

// Sequence
var lazyChain = require('./utils/lazy-chain');
var filter = require('./utils/filter');
var sort = require('./utils/sort');
var paginate = require('./utils/pagination');
var limitFields = require('./utils/limit-fields');

// Sequence corrosponding to the sequence in the API
var sequence = [lazyChain.start, filter, sort, paginate, limitFields, lazyChain.end];

/**
 * Make one complete cicle of the sequence (simulation a request)
 * @param     {Function}    done     callback when finished
 * @param     {Object}      query    Queries in url
 * @return    {void}
 */
var newSequence = function(done, query) {
    var req = {
        payload: stores,
        query: query || {},
        get: function() {
            return '';
        },
        url: 'http://localhost:3000/v1/stores'
    };
    var res = {
        links: function() {}
    };
    var i = 0;
    var loop = function() {
        if (i >= sequence.length) {
            return done();
        }
        i++;
        sequence[i - 1](req, res, loop);
    };
    loop();
};

/**
 * Start performance test
 * @param     {Number}    seconds    For how long to run the test
 * @param     {Object}    query      Queries in the url
 * @return    {void}
 */
var perform = function(seconds, query) {
    var startTime = new Date().getTime();
    var endTime = new Date().getTime() + seconds * 1000;
    var iterations = 0;
    var lastPercentage = 0;
    var done = function() {
        console.log(iterations + ' times in ' + seconds + ' seconds (' + (Math.round(iterations / seconds * 100) / 100) + '/s)');
        console.log();
    };
    var loop = function() {
        var now = new Date().getTime();
        var fromEnd = now - endTime;

        // End looping when time has gone
        if (fromEnd >= 0) {
            return done();
        }
        iterations++;

        // Reset callstack for every 100 stack
        // Show progress
        if (iterations % 100 === 0) {

            var percentage = Math.floor((now - startTime) / seconds / 100) * 10;
            if (percentage !== lastPercentage) {
                lastPercentage = percentage;
                console.log(percentage + '%: ' + iterations);
            }
            setImmediate(function() {
                newSequence(loop, query);
            });
        } else {
            newSequence(loop, query);
        }
    };
    loop();
};

// Start performance test
perform(10, {
    sort: 'postal',
    perpage: '100',
    postal: '8000',
    fields: 'postal'
});

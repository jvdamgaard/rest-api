/**
 * Run all tests and generate code coverage report.
 * Used for the build server.
 */

// Dependencies
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

/**
 * Export gulp job
 * @return        {object}        Gulp stream
 */
module.exports = function() {
    return gulp.src('./test/**/*.js', {
        read: false
    })
        .pipe(mocha({
            bin: './node_modules/mocha/bin/mocha',
            reporter: 'spec'
        }))
        .pipe(istanbul.writeReports()); // Creating coverage report
};

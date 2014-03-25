/**
 * Tell the code coverage tool Istanbul which files to generate a code coverage
 * report of.
 */

// Dependencies
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');

/**
 * Export Gulp job
 * @return        {object}        Gulp stream
 */
module.exports = function() {
    return gulp.src(['v1/**/*.js', 'utils/**/*.js', 'app.js'])
        .pipe(istanbul()); // Covering files
};

/**
 * Static syntax analysis:
 * Lint all javascript files using jshint and jscs.
 * Fail on errors.
 */

// Dependencies
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

/**
 * Export Gulp job
 * @return        {object}        Gulp stream
 */
module.exports = function() {
    return gulp.src(['./**/*.js', '!./node_modules/**', '!./coverage/**'])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
};

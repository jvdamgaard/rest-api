// Dependencies
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

// Static syntax analysis with jshint and jscs
module.exports = function() {
    return gulp.src(['./**/*.js', '!./node_modules/**', '!./coverage/**'])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
};

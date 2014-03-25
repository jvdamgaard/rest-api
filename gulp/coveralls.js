// Dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var coveralls = require('gulp-coveralls');

// Push test coverage to Coveralls.io
module.exports = function() {
    if (process.env.NODE_ENV !== 'build') {
        return gutil.log('Not on build server: No push to coveralls.io');
    }
    return gulp.src('coverage/**/lcov.info')
        .pipe(coveralls());
};

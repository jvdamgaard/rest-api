// Dependencies
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');

// Prepare files to test for code coverage
module.exports = function() {
    return gulp.src(['v1/**/*.js', 'app.js'])
        .pipe(istanbul()); // Covering files
};

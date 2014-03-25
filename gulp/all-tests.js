// Dependencies
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

// Run all tests
module.exports = function() {
    return gulp.src('./test/**/*.js', {
        read: false
    })
        .pipe(mocha({
            bin: './node_modules/mocha/bin/mocha',
            reporter: 'spec'
        }))
        .pipe(istanbul.writeReports()); // Creating the reports after tests runned
};

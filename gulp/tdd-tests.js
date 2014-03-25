/**
 * Run tests whenaver a change is detected.
 * Used for test-driven development
 */

// Dependencies
var args = require('yargs').argv;
var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');

/**
 * Export Gulp job
 * @return        {object}        Gulp stream
 */
module.exports = function() {

    // Tests to be run: defaults to ./tests/**/*.js
    var src = './test/**/*.js';
    if (args.file) {
        src = './test/' + args.file; // E.g. with `gulp tdd --file functional/stores.js`
    } else if (args.type) {
        src = './test/' + args.type + '/**/*.js'; // E.g. with `gulp tdd --type unit`
    }
    gutil.log('Running test in "' + src + '"');

    // Mocha options
    var options = {
        bin: './node_modules/mocha/bin/mocha',
        reporter: args.reporter || 'min'
    };

    // Grep
    if (args.grep) {
        options.grep = args.grep;
    }

    var runTests = function() {
        gulp.src(src)
            .pipe(mocha(options))
            .on('error', function() {});
    };

    gulp.watch(['./**/*.js', '!./node_modules/**', '!./coverage/**'], runTests);
    runTests();
};

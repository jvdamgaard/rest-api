// Dependencies
var args = require('yargs').argv;
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var runSequence = require('run-sequence');

// Static syntax analysis with jshint and jscs
gulp.task('lint', function() {
    return gulp.src(['./**/*.js', '!./node_modules/**', '!./coverage/**'])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('prepareIstanbul', function() {
    return gulp.src(['resources/**/*.js', 'app.js'])
        .pipe(istanbul()); // Covering files
});

// Run all tests
gulp.task('tests', function() {
    return gulp.src('./test/**/*.js', {
        read: false
    })
        .pipe(mocha({
            bin: './node_modules/mocha/bin/mocha',
            reporter: 'spec'
        }))
        .pipe(istanbul.writeReports()); // Creating the reports after tests runned
});

// Test Driven: Watch for changes to js files and rerun tests
var tddTests = function() {

    // Tests to be run: defaults to ./tests/**
    var src = './test/**/*.js';
    if (args.file) {
        src = './test/' + args.file; // E.g. with `gulp tdd --file functional/stores.js`
    } else if (args.type) {
        src = './test/' + args.type + '/**/*.js'; // E.g. with `gulp tdd --type unit`
    }
    console.log('Running test in "' + src + '"');

    // Mocha options
    var options = {
        bin: './node_modules/mocha/bin/mocha',
        reporter: args.reporter || 'min'
    };

    // Grep
    if (args.grep) {
        options.grep = args.grep;
    }

    return gulp.watch(['./**/*.js', '!./node_modules/**', '!./coverage/**'], function() {
        return gulp.src(src)
            .pipe(mocha(options))
            .on('error', gutil.log);
    });
};
gulp.task('tdd', tddTests);
gulp.task('bdd', tddTests);

// Test as run on build server
gulp.task('test', function(done) {
    return runSequence(
        'lint',
        'prepareIstanbul',
        'tests',
        done
    );
});

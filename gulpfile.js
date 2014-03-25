// Dependencies
var gulp = require('gulp');
var runSequence = require('run-sequence');

var lint = require('./gulp/lint');
var prepareIstanbul = require('./gulp/prepare-istanbul');
var allTests = require('./gulp/all-tests');
var coveralls = require('./gulp/coveralls');
var openCoverage = require('./gulp/open-coverage');
var tddTests = require('./gulp/tdd-tests');

gulp.task('lint', lint);
gulp.task('prepareIstanbul', prepareIstanbul);
gulp.task('tests', allTests);
gulp.task('coveralls', coveralls);
gulp.task('openCoverage', openCoverage);
gulp.task('tdd', tddTests);
gulp.task('bdd', tddTests);

// Test as run on build server
gulp.task('test', function(done) {
    return runSequence(
        'lint',
        'prepareIstanbul',
        'tests',
        'coveralls',
        done
    );
});

// Generate and open test coverage report
gulp.task('coverage', function(done) {
    return runSequence(
        'prepareIstanbul',
        'tests',
        'openCoverage',
        done
    );
});

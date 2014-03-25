/**
 * Start a server with the coverage report and open in browser.
 */

// Dependencies
var connect = require('gulp-connect');

/**
 * Export Gulp job
 */
module.exports = connect.server({
    root: ['coverage/lcov-report'],
    port: 1337,
    livereload: false,
    open: true
});

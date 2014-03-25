// Dependencies
var connect = require('gulp-connect');

// Open test coverage report in browser
module.exports = connect.server({
    root: ['coverage/lcov-report'],
    port: 1337,
    livereload: false,
    open: true
});

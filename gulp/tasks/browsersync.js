var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync');

//
//   BrowserSync
//
//////////////////////////////////////////////////////////////////////

/*
Refreses browser on file changes and syncs scroll/clicks between devices.
Your site will be available at http://localhost:3000
*/

module.exports = gulp.task('browserSync', function() {
  browserSync.init(null, {
    open: false,
    notify: false,
    proxy: config.proxy
  });
});

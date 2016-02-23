var config             = require('../config');
var gulp               = require('gulp');

//
//   Copy : Scripts
//
//////////////////////////////////////////////////////////////////////

/*
Copies scripts into dist folder. Useful for scripts we need to include in the
<head> of the document
*/

module.exports = gulp.task('copy:scripts', function() {
  return gulp.src([config.paths.scriptSrc + 'vendor/*.js'])
    .pipe(gulp.dest(config.paths.scriptDist));
});

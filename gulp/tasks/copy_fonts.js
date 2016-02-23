var config       = require('../config');
var gulp         = require('gulp');

//
//   Copy : fonts
//
//////////////////////////////////////////////////////////////////////

/*
Copies fonts into dist directory
*/

module.exports = gulp.task('copy:fonts', function() {
  return gulp.src([config.paths.fontSrc + '/**/*'])
  .pipe(gulp.dest(config.paths.fontDist));
});

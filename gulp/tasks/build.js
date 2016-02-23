var gulp         = require('gulp');
var runSequence  = require('run-sequence');

//
//   Build
//
//////////////////////////////////////////////////////////////////////

/*
Runs all tasks needed to produce a deployable project
*/

module.exports = gulp.task('build', function(callback) {
  runSequence(
    [
      'styles',
      'scripts:lint',
      'scripts:bundle',
      'scripts:uglify',
      'copy:fonts',
      'copy:scripts',
      'templates',
      'svg'
    ],
    'test',
    callback
  );
});

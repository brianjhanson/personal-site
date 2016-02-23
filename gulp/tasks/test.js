var config     = require('../config');
var gulp       = require('gulp');
var sizereport = require('gulp-sizereport');

gulp.task('test:size', function() {
  return gulp.src(config.paths.scriptDist + '/*')
    .pipe(sizereport());
});

gulp.task('test', ['test:size']);

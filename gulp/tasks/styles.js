var config        = require('../config');
var Promise       = require('es6-promise').Promise;
var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var cssGlobbing   = require('gulp-css-globbing');
var importOnce    = require('node-sass-import-once');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');

//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using the following plugins:

cssGlobbing: Allows globbing imports in .scss: @import 'styles/modules/*.scss';
sass: Sass compilation using super-fast libsass
autoprefixer: Automatically adds vendor prefixes to experimental properties
*/

module.exports = gulp.task('styles', function() {
  return gulp.src([
    config.paths.styleSrc + 'main.scss',
  ])
  .pipe(cssGlobbing({
    extensions: ['.scss']
  }))
  .pipe(sass({
    importer: importOnce,
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
  .pipe(gulp.dest(config.paths.styleDist))
  .pipe(browserSync.stream({ match: '**/*.css' }));
});

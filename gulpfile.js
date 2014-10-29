var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso');

var sources = {
  scripts: {
    vendor: 'src/scripts/vendor/*.js',
    plugins: 'src/scripts/plugins.js',
    main: 'src/scripts/main.js'
  },
  styles: 'src/styles/main.scss'
}

var compass = require('gulp-compass');

gulp.task('styles', function() {
  gulp.src([sources.styles])
    .pipe(compass({
      css: 'dist/styles',
      sass: 'src/styles'
    }))
    .pipe(csso())
    .pipe(rename( {suffix: ".min" } ) )
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
  gulp.src([sources.scripts.vendor, sources.scripts.plugins, sources.scripts.main])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename( {suffix: ".min" } ) )
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['scripts', 'styles']);
var config       = require('../config');
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();

//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of image files
*/

module.exports = gulp.task('svg', function() {
  var spriteConfig = {
    mode: {
      symbol: {
        dest: 'craft/templates/symbol',
        inline: false,
      },
      view: {
        dest: 'public/dist/styles',
        sprite: '../images/svg-sprite.svg',
        prefix: '%%',
        layout: 'diagonal',
        render: {
          scss: {
            dest: '../../../src/styles/util/_icons-sprite.scss'
          }
        }
      }
    }
  };

  return gulp.src([
    config.paths.imageSrc + 'svg/*.svg'
  ])
  .pipe($.svgSprite(spriteConfig))
  .pipe(gulp.dest('.'));
});

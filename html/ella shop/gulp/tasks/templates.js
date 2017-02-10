var gulp         = require('gulp');
var pug          = require('gulp-pug');
var replace      = require('gulp-replace');
var gulpif       = require('gulp-if');
var minifyHTML   = require('gulp-minify-html');

var condition = process.env.ENV === 'prod';

gulp.task('pug', function() {
  return gulp.src('app/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulpif(condition,
    replace('<!--styles-->', '<link rel="stylesheet" type="text/css" href="' + config.filenames.release.style + '">'),
    replace('<!--styles-->', '<link rel="stylesheet" type="text/css" href="' + config.filenames.build.style + '">')))
  .pipe(gulpif(condition,
    replace('<!--scripts-->', '<script src="' + config.filenames.release.script + '"></script>'),
    replace('<!--scripts-->', '<script src="' + config.filenames.build.script + '"></script>')))
  .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
  .pipe(gulp.dest('dist/'));
});

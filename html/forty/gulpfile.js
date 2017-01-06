require('./config');

var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-ruby-sass');
var pug          = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-cssmin');
var rename       = require('gulp-rename');
var replace      = require('gulp-replace');
var gulpif       = require('gulp-if');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

var condition = process.env.ENV === 'prod';

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug', 'assets', 'script'], function() {

  browserSync.init({
    server: "./dist",
    port: 3000
  });

  gulp.watch("app/sass/**/*.scss", ['sass']);
  gulp.watch("app/**/*.pug", ['pug']);
  gulp.watch("app/assets/**/*", ['assets']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return sass("app/sass/*.scss", {sourcemap: true, compass: true})
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: false
  }))
  .pipe(gulpif(condition, cssmin()))
  .pipe(gulpif(condition, rename(config.filenames.release.style), rename(config.filenames.build.style)))
  .pipe(gulp.dest("dist/"))
  .pipe(browserSync.stream());
});

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
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

gulp.task('script', function() {
  return gulp.src(config.scripts)
    .pipe(gulpif(condition, concat(config.filenames.release.script), concat(config.filenames.build.script)))
    .pipe(gulpif(condition, uglify()))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('assets', function() {
  return gulp.src('app/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['serve']);

gulp.task('build', ['sass', 'pug', 'assets', 'script']);

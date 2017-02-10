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
var minifyHTML   = require('gulp-minify-html');
var clean        = require('gulp-clean');
var imagemin     = require('gulp-imagemin');
var runSequence  = require('run-sequence');

var condition = process.env.ENV === 'prod';

// Static Server + watching scss/html files
gulp.task('serve', ['clean', 'sass', 'pug', 'assets', 'script', 'imagemin'], function() {

  browserSync.init({
    server: "./dist",
    port: 3000
  });

  gulp.watch("app/**/*.pug", ['pug']);
  gulp.watch("app/sass/**/*.scss", ['sass']);
  gulp.watch("app/scripts/**/*.js", ['script']);
  gulp.watch("app/assets/**/*", ['assets']);
});

gulp.task('clean', function() {
  return gulp.src('dist', {force: true, read: false})
    .pipe(clean());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return sass("app/sass/*.scss", {sourcemap: true, compass: true})
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: true
  }))
  .pipe(gulpif(condition, rename(config.filenames.release.style), rename(config.filenames.build.style)))
  .pipe(gulpif(condition, cssmin()))
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
  .pipe(minifyHTML({empty: true, spare: true, quotes: true}))
  .pipe(gulp.dest('dist/'))
  .pipe(browserSync.stream());
});

gulp.task('script', function() {
  return gulp.src(config.scripts)
    .pipe(gulpif(condition, concat(config.filenames.release.script), concat(config.filenames.build.script)))
    .pipe(gulpif(condition, uglify()))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('assets', function() {
  return gulp.src('app/assets/fonts/*.*')
    .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('imagemin', () =>
  gulp.src('app/assets/images/*.*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('dist/assets/images/'))
);

gulp.task('default', function() {
  runSequence('clean', 'serve');
});

gulp.task('release', function() {
  runSequence('clean', ['sass', 'pug', 'assets', 'script', 'imagemin']);
});

var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');
var rename       = require('gulp-rename');
var cssmin       = require('gulp-cssmin');

var condition = process.env.ENV === 'prod';

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return sass("app/sass/*.scss", {sourcemap: true, compass: true})
  .pipe(autoprefixer({
    browsers: ['last 3 versions'],
    cascade: true
  }))
  .pipe(gulpif(condition, rename(config.filenames.release.style), rename(config.filenames.build.style)))
  .pipe(gulpif(condition, cssmin()))
  .pipe(gulp.dest("dist/"));
});

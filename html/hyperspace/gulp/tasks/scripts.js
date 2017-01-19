var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

var condition = process.env.ENV === 'prod';

gulp.task('script', function() {
  return gulp.src(config.scripts)
    .pipe(gulpif(condition, concat(config.filenames.release.script), concat(config.filenames.build.script)))
    .pipe(gulpif(condition, uglify()))
    .pipe(gulp.dest('./dist/'));
});

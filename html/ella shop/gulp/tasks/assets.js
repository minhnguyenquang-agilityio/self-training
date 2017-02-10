var gulp         = require('gulp');

gulp.task('assets', function() {
  return gulp.src('app/assets/fonts/*.*')
    .pipe(gulp.dest('dist/assets/fonts/'));
});

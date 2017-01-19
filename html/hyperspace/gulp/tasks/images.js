var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');

gulp.task('imagemin', () =>
  gulp.src('app/assets/images/*.*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('dist/assets/images/'))
);

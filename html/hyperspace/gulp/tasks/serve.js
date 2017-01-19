var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var reload  = browserSync.reload;
var runSequence  = require('run-sequence');

// Static Server + watching scss/html files
gulp.task('serve', ['clean', 'sass', 'pug', 'assets', 'script', 'imagemin'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });

  gulp.watch("app/**/*.pug", ['pug', reload]);
  gulp.watch("app/sass/**/*.scss", ['sass', reload]);
  gulp.watch("app/scripts/**/*.js", ['script', reload]);
  gulp.watch("app/assets/**/*", ['assets', reload]);
});

gulp.task('default', function() {
  runSequence('clean', 'serve');
});

gulp.task('release', function() {
  runSequence('clean', ['sass', 'pug', 'assets', 'script', 'imagemin']);
});

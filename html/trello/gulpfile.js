var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-ruby-sass');
var pug         = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("app/sass/**/*.scss", ['sass']);
    // gulp.watch("app/template/*.pug").on('change', browserSync.reload);
    gulp.watch("app/**/*.pug", ['pug']);
  });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return sass("app/sass/*.scss", {sourcemap: true, compass: true})
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest("dist/css"))
  .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src('app/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

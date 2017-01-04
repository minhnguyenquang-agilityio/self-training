var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-ruby-sass');
var pug          = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug', 'assets'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("app/sass/**/*.scss", ['sass']);
  // gulp.watch("app/template/*.pug").on('change', browserSync.reload);
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

gulp.task('assets', function(){
  return gulp.src('app/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['serve']);

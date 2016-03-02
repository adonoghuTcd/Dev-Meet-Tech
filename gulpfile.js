var gulp =        require('gulp'),
    sass =        require('gulp-sass'),
    minify =      require('gulp-minify-css'),
    //minify =      require('gulp-cssmin'),
    rename =      require('gulp-rename'),
    fs =          require('fs'),
    prefixer =    require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();
/*gulp.task('css', function() {
  gulp.src('stylesheets/master.scss')
      .pipe(sass())
      .pipe(prefixer())
      .pipe(minify({ cache: true }))
      .pipe(gulp.dest('./css'))
})*/

gulp.task('watch', function() {
  gulp.watch('./stylesheets/*.scss', ['css'])
})
gulp.task('watch', ['css'], function(gulpCallback) {
  browserSync.init({
    // serve out of app/
    server: './',
    // launch default browser as soon as server is up
    open: true
  }, function callback() {

    gulp.watch('index.html', browserSync.reload);
    gulp.watch('./stylesheets/*.scss', ['css']);

    gulpCallback();
  });
});

gulp.task('css', function() {
  gulp.src('stylesheets/master.scss')
      .pipe(sass())
      .pipe(prefixer())
      .pipe(minify({ cache: true }))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
});

gulp.task('default', ['watch'])

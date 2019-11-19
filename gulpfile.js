// Sass configuration
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
// prevent gulp watch task from crashing if something throws error
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

gulp.task('browserSync', function (done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
  done();
});

gulp.task('sass', function (done) {
  gulp
    .src('./sass/main.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true, outputStyle: 'compressed', }))
    .pipe(rename('style.css'))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
  done();
});

gulp.task('watch', function (done) {
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
  gulp.watch('./index.html', function (done) {
    browserSync.reload();
    done();
  });
  done();
});

gulp.task(
  'default',
  gulp.series('sass', 'browserSync', 'watch')
);
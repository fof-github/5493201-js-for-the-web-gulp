const gulp = require('gulp');
const jshint = require('gulp-jshint');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync').create();

const { watch, series } = require('gulp');





gulp.task('processHTML', (cb) => {
  gulp.src('*.html')
    .pipe(gulp.dest('dist'));
	cb();
});


gulp.task('processJS', (cb) => {
  gulp.src('*.js')
    .pipe(jshint({
      esversion: 8
    }))
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: [ "@babel/preset-env" ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
    cb();
});


gulp.task('processIMG',(cb) => {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
  cb();
});


gulp.task('browserSync', () => {
  browserSync.init({
    server: './dist',
    port: 8080,
    ui: {
      port: 8081
    }
  });
});

gulp.task('watch', () => {
      
      watch('*.js', 'processJS');
      watch('*.html', 'processHTML');
      watch('images/*', 'processIMG');
    
      watch('dist/*.js', browserSync.reload);
      watch('dist/*.html', browserSync.reload);
      watch('dist/images/*', browserSync.reload);

});


exports.default = series(
'processHTML', 
'processJS',
'processIMG', 
'browserSync', 
'watch');

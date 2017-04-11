//* Dependencies
var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')

//* Options
var sassMaster = './styles/app.scss'
var sassFiles = './styles/**/**/*.scss'
var cssDest = './styles/dist'

//* Task: Compile and minify SASS
gulp.task('sass', function () {
  console.log('--------- Sassin Up! ---------')
  return gulp.src(sassMaster)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(cssDest))
})

//* Task: Watch .scss and .js
gulp.task('watch', function() {
    gulp.watch(sassFiles,['sass'])
})

//* Task: Default
gulp.task('default', ['sass', 'watch'])

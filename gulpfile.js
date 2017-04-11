//* Dependencies
var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require("gulp-rename")
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var pump = require('pump')

//* Options
var sassMaster = './styles/app.scss'
var sassFiles = './styles/**/**/*.scss'
var cssDest = './styles/dist'

//
// -- Develop HTML Site --
//

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

//
// -- Package HTML Site --
//
gulp.task('packageHTML', function () {
    gulp.src('./_app.html')
      .pipe(rename("index.html"))
      .pipe(gulp.dest('./_package'));
});
gulp.task('packageFonts', function () {
    gulp.src('./fonts/**/*.*')
      .pipe(gulp.dest('./_package/fonts'));
});
gulp.task('packageImages', function () {
    gulp.src('./images/**/*.*')
      .pipe(gulp.dest('./_package/images'));
});
gulp.task('packageStyles', function () {
  return gulp.src(sassMaster)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('./_package/styles/dist'))
})
gulp.task('packageJS', function (cb) {
  pump([
        gulp.src('./scripts/**/*.js'),
        uglify(),
        gulp.dest('./_package/scripts')
    ],
    cb
  );
});


//* Task: Default
gulp.task('package', ['packageHTML', 'packageFonts', 'packageImages', 'packageStyles', 'packageJS'])

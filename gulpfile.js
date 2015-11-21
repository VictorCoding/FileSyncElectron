var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");

gulp.task("default", function(){
  runSequence("clean-bundle", "build", "watch");
});

gulp.task("build", function () {
  return gulp.src(["app.js", "app/**/*.js", "!bundle.js"])    
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("bundle.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("app"));    
});

gulp.task("clean-bundle", function () {
  return gulp.src(["app/bundle.js", "app/bundle.js.map"], {read: false})
    .pipe(clean());
});

gulp.task("watch", function(){
  gulp.watch(["app/**/*.js", "!bundle.js", "!bundle.js.map"], function(){
    runSequence("clean-bundle", "build");
  });
});
"use strict";

let gulp = require("gulp");
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
let include = require("gulp-file-include");
let i18n = require("gulp-i18n-localize");
let htmlmin = require("gulp-htmlmin");
// let uglify = require("gulp-uglify");
let minifyCSS = require("gulp-csso");
let rename = require("gulp-rename");
let babel = require("gulp-babel");

function dest() {
  return gulp.dest("rsa-visual-and-more");
}

function translate() {
  return i18n({
    locales: ["en", "de"],
    localeDir: "./rsa-visual-and-more/locales",
    schema: "suffix",
  });
}

gulp.task("js", ["collect-locales"], function () {
  return (
    gulp
      .src(["src/resources/scripts/rsa-didactic/*.js", "src/resources/scripts/rsa-visualization/*.js", "src/resources/scripts/rsa-real-use/command.js"], { base: "src/" })
      .pipe(translate())
      .pipe(babel())
      // .pipe(uglify())
      .pipe(gulp.dest("rsa-visual-and-more/."))
  );
});

gulp.task("css", ["collect-locales"], function () {
  return (
    gulp
      .src(["src/resources/style/**/*.css",], { base: "src/" })
      .pipe(include())
      .pipe(minifyCSS())
      .pipe(dest("rsa-visual-and-more/."))
  );
});


gulp.task("collect-locales", function () {
  return gulp
    .src(["src/locales/*/*.json"])
    .pipe(
      rename(function (path) {
        path.dirname = path.dirname.substring(
          path.dirname.lastIndexOf("/") + 1
        );
      })
    )
    .pipe(gulp.dest("./rsa-visual-and-more/locales"));
});

gulp.task("html", ["collect-locales"], function () {
  return gulp
    .src(["src/*.html"])
    .pipe(include())
    .pipe(translate())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest());
});

gulp.task("config", function () {
  return gulp
    .src(["src/cto.config.json", "!src/common/**"])
    .pipe(include())
    .pipe(dest());
});


gulp.task("resources", function () {
  return gulp
    .src(["src/resources/**", "!src/resources/scripts/rsa-didactic/*.js", "!src/resources/scripts/rsa-visualization/*.js", "!src/resources/scripts/rsa-real-use/command.js", "!src/resources/style/**"])
    .pipe(gulp.dest("rsa-visual-and-more/resources"));
});


gulp.task('openssl', function (cb) {
  exec('src/resources/openssl/build.sh', function (err, stdout, stderr) {
    console.log(stderr);
    cb(err);
  }).stdout.pipe(process.stdout);
})


gulp.task('build_openssl', function (callback) {
  runSequence(
    'openssl',
  );
});

gulp.task("build_dist", ['html', 'config', 'js', 'css', 'resources']);



gulp.task('default', function (callback) {
  runSequence(
    'build_openssl',
    'build_dist',
    callback
  );
});
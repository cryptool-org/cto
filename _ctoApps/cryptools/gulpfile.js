"use strict"

let gulp = require("gulp")
let include = require("gulp-file-include")
let i18n = require("gulp-i18n-localize")
let htmlmin = require("gulp-htmlmin")
let uglify = require("gulp-uglify")
let minifyCSS = require("gulp-csso")
let rename = require("gulp-rename")
let babel = require("gulp-babel")

const dest = () => { return gulp.dest("dist") }

const translate = () => {
    return i18n({
        locales: ["en", "de"],
        localeDir: "./dist/locales",
        schema: "suffix"
    })
}

const collectLocales = function() {
    return gulp.src("src/*/locales/*/*.json")
        .pipe(rename(function(path) {
            path.dirname = path.dirname.substring(path.dirname.lastIndexOf("/") + 1)
        }))
        .pipe(gulp.dest("dist/locales"))
}

const processHTML = function() {
    return gulp.src(["src/*/*.html", "!src/common/**"])
        .pipe(include())
        .pipe(translate())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest())
} // needs collectLocales

const processCSS = function() {
    return gulp.src(["src/**/*.css", "!src/common/**"])
        .pipe(include())
        .pipe(minifyCSS())
        .pipe(dest())
} // needs collectLocales

const processJS = function() {
    return gulp.src(["src/**/*.js", "!src/common/**"])
        .pipe(include())
        .pipe(translate())
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest())
} // needs collectLocales

const copyConfig = function() {
    return gulp.src(["src/*/cto.config.json", "!src/common/**"])
        .pipe(include())
        .pipe(dest())
}

const copyBootstrap = function() {
    return gulp.src(["node_modules/bootstrap/dist/css/bootstrap.css", "node_modules/bootstrap/dist/js/bootstrap.js"])
        .pipe(dest())
}

const copyjQuery = function() {
    return gulp.src("node_modules/jquery/dist/jquery.js")
        .pipe(dest())
}

module.exports = {
    default: gulp.series(collectLocales, copyConfig, processHTML, processCSS, processJS, copyBootstrap, copyjQuery)
}

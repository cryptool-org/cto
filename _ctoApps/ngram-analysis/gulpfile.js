"use strict";

let gulp = require("gulp"); // import?
let i18n = require("gulp-i18n-localize");
let include = require("gulp-file-include");
let rename = require("gulp-rename");

const dest = () => { return gulp.dest("dist") };

const translate = () => {
    return i18n({
        locales: ["en", "de"],
        localeDir: "./dist/locales",
        schema: "suffix"
    });
};

const collectLocales = function() {
    return gulp.src("src/*/locales/*/*.json")
        .pipe(rename(function(path) {
            path.dirname = path.dirname.substring(path.dirname.lastIndexOf("/") + 1);
        }))
        .pipe(gulp.dest("dist/locales"));
};

const processHTML = function() {
    return gulp.src(["src/*/*.html", "!src/common/**"])
        .pipe(include())
        .pipe(translate())
        .pipe(dest());
}; // needs collectLocales

const processCSS = function() {
    return gulp.src(["src/**/*.css", "!src/common/**"])
        .pipe(include())
        .pipe(dest());
}; // needs collectLocales

const processJS = function() {
    return gulp.src(["src/**/*.js", "!src/common/**"])
        .pipe(include())
        .pipe(translate())
        .pipe(dest());
}; // needs collectLocales

const copyConfig = function() {
    return gulp.src(["src/*/cto.config.json", "!src/common/**"])
        .pipe(include())
        .pipe(dest());
};

module.exports = {
    default: gulp.series(collectLocales, copyConfig, processHTML, processCSS, processJS)
};
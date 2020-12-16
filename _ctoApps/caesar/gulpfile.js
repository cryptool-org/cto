"use strict"

let gulp = require("gulp") // import?
let i18n = require("gulp-i18n-localize")
let include = require("gulp-file-include")
let rename = require("gulp-rename")
let merge = require("merge-stream")

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
    return gulp.src(["src/*/*.html", "!src/common/**", "!src/*/resources/**"])
        .pipe(include())
        .pipe(translate())
        .pipe(dest())
} // needs collectLocales

const processCSS = function() {
    return gulp.src(["src/**/*.css", "!src/common/**", "!src/*/resources/**"])
        .pipe(include())
        .pipe(dest())
} // needs collectLocales

const processJS = function() {
    return gulp.src(["src/**/*.js", "!src/common/**", "!src/*/resources/**"])
        .pipe(include())
        .pipe(translate())
        .pipe(dest())
} // needs collectLocales

const copyConfig = function() {
    return gulp.src(["src/*/cto.config.json", "!src/common/**", "!src/*/resources/**"])
        .pipe(include())
        .pipe(dest())
}

const copyCodeMirror = function() {
    const inputFolder = "node_modules/codemirror/"
    const outputFolder = "dist/caesar/resources/codemirror/"
    return merge(
        gulp.src(inputFolder + "lib/**").pipe(gulp.dest(outputFolder + "lib/")),
        gulp.src(inputFolder + "mode/python/**").pipe(gulp.dest(outputFolder + "mode/python/")),
        gulp.src(inputFolder + "theme/shadowfox.css").pipe(gulp.dest(outputFolder + "theme/")),
        gulp.src(inputFolder + "theme/solarized.css").pipe(gulp.dest(outputFolder + "theme/")),
        gulp.src(inputFolder + "theme/eclipse.css").pipe(gulp.dest(outputFolder + "theme/")),
        gulp.src(inputFolder + "theme/yeti.css").pipe(gulp.dest(outputFolder + "theme/"))
    )
} // codemirror is the editor used for Python

const copyResources = function() {
    return gulp.src("src/*/resources/**")
        .pipe(dest())
}

module.exports = {
    default: gulp.series(collectLocales, copyConfig, copyCodeMirror, copyResources, processHTML, processCSS, processJS)
}
"use strict";

let gulp = require('gulp');
let ts = require('gulp-typescript');
let include = require('gulp-file-include');
let i18n = require('gulp-i18n-localize');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let minifyCSS = require('gulp-csso');
let rename = require('gulp-rename');
let babel = require('gulp-babel');

function dest() {
    return gulp.dest('dist');
}

function translate() {
    return i18n({
        locales: ['en', 'de'],
        localeDir: './dist/locales',
        schema: 'suffix'
    });
}

gulp.task('collect-locales', function () {
    return gulp.src(['src/*/locales/*/*.json'])
        .pipe(rename(function (path) {
            path.dirname = path.dirname.substring(path.dirname.lastIndexOf('/') + 1)
        }))
        .pipe(gulp.dest('./dist/locales'));

});

gulp.task('html', ['collect-locales'], function () {
    return gulp.src(['src/*/*.html'])
        .pipe(include())
        .pipe(translate())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(dest());
});

gulp.task('ts-and-js', ['collect-locales'], function () {
    return gulp.src(['src/**/*.ts', 'src/**/*.js'])
        .pipe(include())
        .pipe(ts({
            allowJs: true
        })) // note: ts is made for gulp v4
        .on('error', () => { /* ignore errors */})
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest());
});

gulp.task('css', function () {
    return gulp.src(['src/*/*.css', '!src/common/**'])
        .pipe(include())
        .pipe(minifyCSS())
        .pipe(dest());
});

gulp.task('images', function () {
    return gulp.src('src/passwordmeter/images/*')
        .pipe(gulp.dest('dist/passwordmeter/images'))
});

gulp.task('config', function () {
    return gulp.src(['src/*/cto.config.json', '!src/common/**'])
        .pipe(include())
        .pipe(dest());
});

gulp.task('bootstrap', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/bootstrap/dist/js/bootstrap.js'])
        .pipe(dest())
});

gulp.task('jquery', function () {
    return gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(dest())
});

gulp.task('zxcvbn', function () {
    return gulp.src(['node_modules/zxcvbn/dist/zxcvbn.js', 'node_modules/zxcvbn/dist/zxcvbn.js.map'])
        .pipe(gulp.dest('dist/passwordmeter/library'))
});

gulp.task('localforage', function () {
    return gulp.src('node_modules/localforage/dist/localforage.min.js')
        .pipe(rename(function (path) {
            path.basename = "localforage";
        }))
        .pipe(gulp.dest('dist/passwordmeter/library'))
});

gulp.task('copy-wordlists', function () {
    return gulp.src('src/*/wordlists/*.txt')
        .pipe(dest());
});

gulp.task('default', ['bootstrap', 'jquery', 'zxcvbn', 'localforage', 'html', 'ts-and-js', 'css', 'config', 'copy-wordlists', 'images']);
"use strict";

let gulp = require('gulp');
let include = require('gulp-file-include');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let minifyCSS = require('gulp-csso');
let babel = require('gulp-babel');
let i18n = require('gulp-i18n-localize');

function dest() {
    return gulp.dest('dist/enigmatic');
}

function translate() {
    return i18n({
        locales: ['en', 'de'],
        localeDir: './locales',
        schema: 'suffix'
    });
}

gulp.task('html', function() {
    return gulp.src(['web.html', 'enigmatic.html'])
        .pipe(include())
        .pipe(translate())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest());
});

gulp.task('js', function() {
    return gulp.src(['enigmatic.js'])
        .pipe(include())
        .pipe(translate())
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest());
});

gulp.task('css', function() {
    return gulp.src(['enigmatic.css'])
        .pipe(minifyCSS())
        .pipe(dest());
});

gulp.task('config', function() {
    return gulp.src(['cto.config.json']).pipe(dest());
});

gulp.task('bootstrap', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest("dist"))
});

gulp.task('bootstrap-fonts', function () {
    return gulp.src(['node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('jquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest("dist"))
});

gulp.task('default', ['html', 'js', 'css', 'config', 'bootstrap', 'bootstrap-fonts', 'jquery']);
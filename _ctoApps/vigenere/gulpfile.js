"use strict";

var gulp = require('gulp');
var include = require('gulp-file-include');
var i18n = require('gulp-i18n-localize');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var zip = require('gulp-zip');

function dest() {
    return gulp.dest('dist');
}

gulp.task('collect-locales', function() {
    return gulp.src(['src/*/locales/*/*.json'])
        .pipe(rename(function(path) {
            path.dirname = path.dirname.substring(path.dirname.lastIndexOf('/') + 1)
        }))
        .pipe(gulp.dest('./dist/locales'));

});

gulp.task('html', ['collect-locales'], function () {
    return gulp.src(['src/*/*.html', '!src/common/**', '!src/test/**'])
        .pipe(include())
        .pipe(i18n({
            locales: ['en', 'de'],
            localeDir: './dist/locales',
            schema: 'suffix'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest());
});

gulp.task('js', function (){
    return gulp.src(['src/*/*.js', '!src/common/**', '!src/test/**'])
        .pipe(include())
        .pipe(uglify())
        .pipe(dest());
});

gulp.task('css', function (){
    return gulp.src(['src/*/*.css', '!src/common/**', '!src/test/**'])
        .pipe(include())
        .pipe(minifyCSS())
        .pipe(dest());
});

gulp.task('config', function () {
    return gulp.src(['src/*/cto.config.json', '!src/common/**', '!src/test/**'])
        .pipe(include())
        .pipe(dest());
});

gulp.task('build-tests', function () {
    return gulp.src('src/test/*.js')
        .pipe(include())
        .pipe(gulp.dest('dist-test'));
});

gulp.task('test', ['build-tests'], function () {
    return gulp.src('dist-test/*.js')
        .pipe(mocha());
});

gulp.task('bootstrap', function () {
    return gulp.src('lib/bootstrap/*')
        .pipe(dest())
});

gulp.task('jquery', function() {
    return gulp.src('lib/jquery/*')
        .pipe(dest())
});
gulp.task('default', [ 'test', 'bootstrap', 'jquery', 'html', 'js', 'css', 'config' ]);

gulp.task('dist', ['default'], function () {
    return gulp.src(['./**', '!node_modules/**', '!.idea/**', '!.git/**', '!*.zip', '!web/**', '!dist-test/**', '!dist/locales/**', '!dist/bootstrap*', '!dist/jquery*'])
        .pipe(zip('vigenere.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('web', ['default', 'dist'], function () {
    return gulp.src(['*.zip', 'dist/**', '!dist/locales', '!dist/locales/**', '!**/fragment-*.html', '!**/cto.config.json']).pipe(gulp.dest('web'));
});


var gulp = require('gulp');
var concat = require('gulp-concat');
var html = require('gulp-htmlmin');
var gif = require('gulp-if');
var inline = require('gulp-inline');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var resources = require('gulp-resources');

var lazypipe = require('lazypipe');
var shell = require('shelljs');

var now = new Date().toISOString();
var formattedDate = now.substring(0, 10) + ' ' + now.substring(11, 19);
var commit = shell.exec('git rev-parse --short HEAD', {silent: true}).output.trim();

gulp.task('default', function () {
    var jspipe = lazypipe()
        .pipe(concat, 'all.js')
        .pipe(gulp.dest, 'tmp');

    var csspipe = lazypipe()
        .pipe(concat, 'all.css')
        .pipe(gulp.dest, 'tmp');

    var htmlpipe = lazypipe()
        .pipe(replace, /<!--startjs-->[^]+<!--endjs-->/, '<script src="tmp/all.js"></script>')
        .pipe(replace, /<!--startcss-->[^]+<!--endcss-->/, '<link href="tmp/all.css" rel="stylesheet">')
        .pipe(inline, {})
        .pipe(rename, 'index.html')
        .pipe(html, {
            removeComments: true,
            removeWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        })
        .pipe(gulp.dest, './');

    gulp.src('main.html')
        .pipe(replace(/\[DATE]/g, formattedDate))
        .pipe(replace(/\[LAST-COMMIT]/g, commit))
        .pipe(resources())
        .pipe(gif('**/*.js', jspipe()))
        .pipe(gif('**/*.css', csspipe()))
        .pipe(gif('**/*.html', htmlpipe()));
});

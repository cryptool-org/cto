"use strict";

var gulp = require('gulp');
var include = require('gulp-file-include');
var i18n = require('gulp-i18n-localize');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-csso');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var zip = require('gulp-zip');
var Ssh = require('gulp-ssh');
var fs = require('fs');
var through = require('through2');
var path = require('path');

var ssh = new Ssh({
    ignoreErrors: true,
    sshConfig: {
        host: 'cryptool.org',
        username: process.env.SSH_USER ? process.env.SSH_USER : 'knapetm',
        privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
    }
});

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
        .pipe(translate())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest());
});

gulp.task('js', ['collect-locales'], function (){
    return gulp.src(['src/*/*.js', '!src/common/**', '!src/test/**', '!src/**/t_*.js'])
        .pipe(include())
        .pipe(translate())
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
    return gulp.src('src/**/t_*.js')
        .pipe(include())
        .pipe(flatten())
        .pipe(gulp.dest('dist/test'));
});

gulp.task('test', ['build-tests'], function () {
    return gulp.src('dist/test/*.js')
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

function dirs_to_deploy() {
    return gulp.src(['dist/*', '!dist/test', '!dist/locales', '!dist/bootstrap*', '!dist/jquery*']);
}

function files_to_deploy() {
    return gulp.src(['dist/**', '!dist/test', '!dist/test/**', '!dist/locales', '!dist/locales/**', '!dist/*/web-*.html', '!dist/bootstrap*', '!dist/jquery*']);
}

var remote_dir = '/var/www/cryptool-dev/_ctoApps/';
function get_remote_path(p) { return remote_dir + path.basename(p); }

gulp.task('prepare-deploy', function() {
    return dirs_to_deploy()
        .pipe(through.obj(function (chunk, encoding, cb) {
            var remote_path = get_remote_path(chunk.path);
            var old_path = remote_path + '_old';
            ssh.shell([
                'rm -Rf "' + old_path + '"',
                'mv "' + remote_path + '" "' + old_path + '" || true'
            ]);
            cb(null, chunk);
        }))
});

gulp.task('do-deploy', ['prepare-deploy'], function() {
    return files_to_deploy()
        .pipe(ssh.dest(remote_dir))
});

gulp.task('post-deploy', ['do-deploy'], function() {
    return dirs_to_deploy()
        .pipe(through.obj(function (chunk, encoding, cb) {
            ssh.exec('chgrp -R www-data "' + get_remote_path(chunk.path) + '"');
            cb(null, chunk);
        }));

});
gulp.task('deploy', ['default', 'post-deploy']);

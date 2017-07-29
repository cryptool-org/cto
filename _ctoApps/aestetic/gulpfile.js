"use strict";

let gulp = require('gulp');
let include = require('gulp-file-include');
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify');
let minifyCSS = require('gulp-csso');
let babel = require('gulp-babel');
let Ssh = require('gulp-ssh');
let fs = require('fs');
let through = require('through2');
let path = require('path');
let i18n = require('gulp-i18n-localize');

let ssh = new Ssh({
    ignoreErrors: true,
    sshConfig: {
        host: 'cryptool.org',
        username: process.env.SSH_USER ? process.env.SSH_USER : 'knapetm',
        privateKey: fs.existsSync(process.env.HOME + '/.ssh/id_rsa') ?
            fs.readFileSync(process.env.HOME + '/.ssh/id_rsa') : ''
    }
});

function dest() {
    return gulp.dest('dist/aestetic');
}

function translate() {
    return i18n({
        locales: ['en', 'de'],
        localeDir: './locales',
        schema: 'suffix'
    });
}

gulp.task('html', function() {
    return gulp.src(['web.html', 'aestetic.html'])
        .pipe(include())
        .pipe(translate())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest());
});

gulp.task('js', function() {
    return gulp.src(['aestetic.js'])
        .pipe(include())
        .pipe(translate())
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest());
});

gulp.task('css', function() {
    return gulp.src(['aestetic.css'])
        .pipe(minifyCSS())
        .pipe(dest());
});

gulp.task('config', function() {
    return gulp.src(['cto.config.json']).pipe(dest());
});

gulp.task('bootstrap', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/bootstrap/dist/js/bootstrap.js'])
        .pipe(dest())
});

gulp.task('bootstrap-fonts', function () {
    return gulp.src(['node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('jquery', function() {
    return gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(dest())
});

gulp.task('default', ['html', 'js', 'css', 'config', 'bootstrap', 'bootstrap-fonts', 'jquery']);

let remote_dir = '/var/www/cryptool-dev/_ctoApps/aestetic';
function get_remote_path(p) { return remote_dir + path.basename(p); }

function dirs_to_deploy() {
    return gulp.src(['dist/*']);
}

function files_to_deploy() {
    return gulp.src(['dist/aestetic/aestetic.*', 'dist/aestetic/cto.config.json']);
}

gulp.task('prepare-deploy', function() {
    return dirs_to_deploy()
        .pipe(through.obj(function (chunk, encoding, cb) {
            let remote_path = get_remote_path(chunk.path);
            let old_path = remote_path + '_old';
            ssh.shell([
                'rm -Rf "' + old_path + '"',
                'mv "' + remote_path + '" "' + old_path + '" || true'
            ]);
            cb(null, chunk);
        }))
});

gulp.task('do-deploy', [/*'prepare-deploy'*/], function() {
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

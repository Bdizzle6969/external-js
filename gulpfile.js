/*
  Gulp File Task Handler

  Tasks:

  js -- Watches and concatenates the ./out/fmoyt-external.js file from
  the set of required files.
 */

'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var customOpts = {
  entries: ['./main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

gulp.task('js', bundle);

b.on('update', bundle);
b.on('log', gutil.log); 

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('fmoyt-external.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) 
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./out'));
}

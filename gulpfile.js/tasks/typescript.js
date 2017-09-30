'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var handleErrors = require('../util/handleErrors');

var tsProject = ts.createProject('tsconfig.json');

var typescriptTask = function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', handleErrors)
        .once('error',function() {
            this.once('finish',()=>{
                console.log('Failed compilation...');
                process.exit(1);
            })
        })
    return tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .on('error', handleErrors);
};

gulp.task('typescript', typescriptTask);
module.exports = typescriptTask;

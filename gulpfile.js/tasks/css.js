'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

var cssTask = function() {

    return gulp.src('src/scss/**/*.{sass,scss,css}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            indentedSyntax: false,
            includePaths: [
              'node_modules/powerschool-design-system/src/scss',
              'node_modules/foundation-sites/scss',
              'node_modules/font-awesome/scss'
            ]
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer({
            browsers: ['last 3 version']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
};

gulp.task('css', cssTask);
module.exports = cssTask;

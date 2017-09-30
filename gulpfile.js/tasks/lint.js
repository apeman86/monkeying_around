'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var handleErrors = require('../util/handleErrors');

var tslintTask = function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            configuration: './typescript_style_guide/tslint.json'
        }))
        .pipe(tslint.report({
            emitError: true,
            summarizeFailureOutput: true
        }))
        .on('error', handleErrors);
};

gulp.task('tslint', tslintTask);
module.exports = tslintTask;

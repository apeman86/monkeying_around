'use strict';

var gulp = require('gulp');
var del = require('del');

var cleanTask = function() {
  return del(['dist/**/*']);//, 'test/dist/**/*', 'test-dist/**/*'*/]);
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;

'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var karma = require('karma');
var del = require('del');
var handleErrors =require('../util/handleErrors');

var tsProject = ts.createProject('tsconfig.test.json');

gulp.task('test', function(done) {
  del('test-dist').then(() => {
    tsProject.src()
      .pipe(tsProject())
      .pipe(gulp.dest('test-dist'))
      .on('end', function() {
        new karma.Server({
          configFile: __dirname + '/../../karma.conf.js',
          singleRun: true
        }, function(results) {
          if (results === 1) {
            console.error('Unit tests failed. Please Fix.');
          }
          
            done();
          
        }).start();
      })
      .on('error', handleErrors);
    });
});

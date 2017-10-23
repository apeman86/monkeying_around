'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var handleErrors = require('../util/handleErrors');

var copyTask = function () {
    var assets = [
        // HTML
        {
            src: 'src/**/*.html',
            dest: ''
        },

        // JS
        {
            src: 'src/js/**/*.js',
            dest: 'js'
        },

        // Images
        {
            src: 'src/img/**/*',
            dest: 'img'
        },

        // Favicon
        // {
        //   src: 'node_modules/powerschool-design-system/dist/ps-favicon.ico',
        //   dest: ''
        // },

        // Libs
        {
            src: 'node_modules/core-js/client/shim.min*.{js,map}',
            dest: 'js/lib'
        }, {
            src: 'node_modules/zone.js/dist/zone*.{js,map}',
            dest: 'js/lib'
        }, {
            src: 'node_modules/reflect-metadata/Reflect*.{js,map}',
            dest: 'js/lib'
        }, {
            src: 'node_modules/systemjs/dist/system*.{js,map}',
            dest: 'js/lib'
        }, {
          src: 'node_modules/socket.io-client/dist/socket.io*.{js,map}',
          dest: 'js/lib/socket.io'
        }, {
            src: 'node_modules/@angular/**/*',
            dest: 'js/lib/@angular'
        }, {
            src: 'node_modules/angular2-in-memory-web-api/**/*',
            dest: 'js/lib/angular2-in-memory-web-api'
        }, {
            src: 'node_modules/rxjs/**/*',
            dest: 'js/lib/rxjs'
        }
    ];

    var mergedStreams = merge();

    assets.forEach(function(asset) {
        mergedStreams.add(gulp.src(asset.src)
            .pipe(gulp.dest('dist/' + asset.dest))
            .on('error', handleErrors)
        );
    });

    return mergedStreams;
};

var copySourceTask = function() {
  var assets = [
    // HTML
    {
      src: 'src/**/*.html',
      dest: ''
    },

    // JS
    {
      src: 'src/js/**/*.js',
      dest: 'js'
    },

    // Images
    {
      src: 'src/img/**/*',
      dest: 'img'
    }
  ];

  var mergedStreams = merge();

  assets.forEach(function(asset) {
    mergedStreams.add(gulp.src(asset.src)
      .pipe(gulp.dest('dist/' + asset.dest))
      .on('error', handleErrors)
    );
  });

  return mergedStreams;
};

gulp.task('copy', copyTask);
gulp.task('copySource', copySourceTask);
module.exports = copyTask;

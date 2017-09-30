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
        // {
        //     src: 'node_modules/core-js/client/shim.min*.{js,map}',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/zone.js/dist/zone*.{js,map}',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/reflect-metadata/Reflect*.{js,map}',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/systemjs/dist/system*.{js,map}',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/@angular/**/*',
        //     dest: 'js/lib/@angular'
        // }, {
        //     src: 'node_modules/angular2-in-memory-web-api/**/*',
        //     dest: 'js/lib/angular2-in-memory-web-api'
        // }, {
        //     src: 'node_modules/rxjs/**/*',
        //     dest: 'js/lib/rxjs'
        // }, {
        //     src: 'node_modules/google-code-prettify/bin/prettify.min.js',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/powerschool-design-system/dist/**/*.{js,map,html,svg}',
        //     dest: 'js/lib/pds-components'
        // }, {
        //     src: 'node_modules/powerschool-design-system/dist/angular-modules/**/*.{js,map,html}',
        //     dest: 'js/lib/pds-components'
        // }, {
        //     src: 'node_modules/powerschool-design-system/dist/img/**/*',
        //     dest: 'img'
        // }, {
        //     src: 'node_modules/powerschool-design-system/dist/fonts/*',
        //     dest: 'fonts'
        // }, {
        //     src: 'node_modules/ng2-translate/**/*',
        //     dest: 'js/lib/ng2-translate'
        // }, {
        //     src: 'node_modules/powerschool-design-system/dist/fusioncharts/*.js',
        //     dest: 'js/lib/fusioncharts'
        // }, {
        //     src: 'node_modules/webcomponents.js/webcomponents-lite.js',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/sortablejs/Sortable.js',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/getstream/dist/js/getstream.js',
        //     dest: 'js/lib'
        // }, {
        //     src: 'node_modules/localforage/dist/localforage.js',
        //     dest: 'js/lib'
        // },
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

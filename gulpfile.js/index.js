'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// require all task files
requireDir('./tasks', { recurse: true });

// default task for development
gulp.task('default', function(done) {
    runSequence('build', 'webserver', function() {
        // watch for SASS changes
        gulp.watch(['src/scss/**/*'],
            function() {
                runSequence('css');
            }
        );

        // watch for TypeScript changes
        // gulp.watch('src/**/*.ts',
        //     function() {
        //         runSequence('tslint', 'typescript');
        //     }
        // );

        // Watch for HTML, IMG, JS changes
        gulp.watch(['src/**/*.html', 'src/img/**/*', 'src/js/**/*'],
            function() {
                runSequence('copySource');
            }
        );

        // Watch for test changes
        // gulp.watch('test/**/*',
        //     function() {
        //         runSequence('test');
        //     }
        // );

        done();
    });
});

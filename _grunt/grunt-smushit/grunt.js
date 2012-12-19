module.exports = function( grunt ) {
    'use strict';

    grunt.initConfig({
        smushit:{
            specific: {
                src:['tests/img/logo.png']
            },
            path: {
                src:'tests/img'
            },
            single: {
                src:'tests/img/logo.png'
            },
            output: {
                src:['tests/img/logo.png','tests/img/brand/logo.png'],
                dest:'tests/opt_img'
            },
            outputPath:{
                src:'tests/img',
                dest:'tests/opt_img'
            }
        },
        lint: {
            files: [
                'grunt.js',
                'tasks/**/*.js'
            ]
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },
        jshint: {
            options: {
                es5: true,
                esnext: true,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                regexp: true,
                undef: true,
                strict: true,
                trailing: true,
                smarttabs: true,
                node: true
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask( 'default', 'lint smushit' );

};
/*global module:false require*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    files: {
      grunt: ['gruntfile.js'],
      js:    ['js/custom/*.js'],
      css:   ['css/custom/*.css'],
      img:   ['img']
    },

    smushit: {
      path: { src: '<%= files.img %>' } // recursively replace minified images
    },

    concat: {
      css: {
        src: ['<%= files.css %>'],
        dest: 'css/libs/z.styles.concat.css'
      },
      csslibs: {
        src: ['css/libs/*.css'],
        dest: 'css/libs/z.styles.concat.css'
      },
      cssmin: {
        src: ['css/min/*.css'],
        dest: 'css/min/styles.min.css'
      },

      js: {
        src: ['<%= files.js %>'],
        dest: 'js/libs/z.scripts.concat.js'
      },
      jslibs: {
        src: ['js/libs/*.js'],
        dest: 'js/libs/z.scripts.concat.js'
      },
      jsmin: {
        src: ['js/min/*.js'],
        dest: 'js/min/scripts.min.js'
      }
    },

    uglify: {
      dist: {
        src: ['js/libs/z.scripts.concat.js'],
        dest: 'js/min/scripts.min.js'
      }
    },

    jshint: {
      files: ['<%= files.grunt %>', '<%= files.js %>'],

      options: {
        jquery: true,
        smarttabs: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },

      globals: {
        jQuery: true,
        console: true,
        undef: true,
        unused: false
      }
    },

    cssmin: {
      dist: {
        src: ['css/libs/z.styles.concat.css'],
        dest: 'css/min/styles.min.css'
      }
    },

    csslint: {
      styles: {
        src: ['css/custom/*.css'],
        options: {
          // 'import': false,
          'ids': false,
          'font-sizes': false,
          'unqualified-attributes': false,
          'floats': false,
          'overqualified-elements': false,
          'adjoining-classes': false,
          'important': false,
          'box-sizing': false,
          'unique-headings': false,
          'qualified-headings': false,
          'regex-selectors': false,
          'universal-selector': false,
          'duplicate-properties': false,
          'duplicate-background-images': false,
          'box-model': false,
          'outline-none': false,
          'text-indent': false,
          'compatible-vendor-prefixes': false,
          'star-property-hack': false,
          'display-property-grouping': false,
          'underscore-property-hack': false
        }
      }
    },

    watch: {
      files: ['<%= files.grunt %>', '<%= files.js %>', '<%= files.css %>'],
      tasks: ['default']
    }
  });


  // load plugins installed from npm (see package.json)
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-smushit');

  /**
   * Default task
   *
   * Lets break it down.
   *   lint custom JS in /custom/
   *   concat custom JS into /libs/
   *   concat custom and non-minified JS libraries/plugins in /libs/
   *   minify concatenated JS in /libs/ to /min/
   *   concat all minified JS in /min/
   * Then repeate for CSS.
   *
   * As a result
   *   pathing will be maintained by the flat structure
   *   development code will live in concatenated /libs/scripts.js and /libs/styles.css
   *   production code will live in minified /min/scripts.min.js and /min/styles.min.css
   */
  // grunt.registerTask('default', 'lint concat:js concat:jslibs min concat:jsmin   csslint concat:css concat:csslibs cssmin concat:cssmin');
  grunt.registerTask('default', [
                      'jshint',
                      'concat:js',
                      'concat:jslibs',
                      'uglify',
                      'concat:jsmin',
                      'csslint',
                      'concat:css',
                      'concat:csslibs',
                      'cssmin',
                      'concat:cssmin'
                    ]);

  /**
   * Minify task
   *
   * Run the default task then losslessly minify images with Yahoo!'s Smush-It
   */
  grunt.registerTask('minify', ['default', 'smushit']);
};

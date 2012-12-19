/*global module:false require*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    files: {
      grunt: ['grunt.js'],
      js:    ['js/custom/*.js'],
      css:   ['css/custom/*.css'],
      img:   ['img']
    },


    smushit: {
      path: { src: '<config:files.img>' } // recursively replace minified images
    },

    concat: {
      css: {
        src: ['<config:files.css>'],
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
        src: ['<config:files.js>'],
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

    min: {
      dist: {
        src: ['js/libs/z.scripts.concat.js'],
        dest: 'js/min/scripts.min.js'
      }
    },

    cssmin: {
      dist: {
        src: ['css/libs/z.styles.concat.css'],
        dest: 'css/min/styles.min.css'
      }
    },

    lint: {
      files: ['<config:files.grunt>', '<config:files.js>']
    },

    csslint: {
      styles: {
        src: ['css/custom/*.css'],
        rules: {
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
      files: ['<config:files.grunt>', '<config:files.js>', '<config:files.css>'],
      tasks: 'default'
    },

    jshint: {
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
      globals: {}
    },

    uglify: {}
  });


  // load css min/lint and smush-it plugins
  grunt.loadTasks('_grunt/grunt-css/tasks/');
  grunt.loadTasks('_grunt/grunt-smushit/tasks/');

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
  grunt.registerTask('default', 'lint concat:js concat:jslibs min concat:jsmin   csslint concat:css concat:csslibs cssmin concat:cssmin');

  /**
   * Minify task
   *
   * Run the default task then losslessly minify images with Yahoo!'s Smush-It
   */
  grunt.registerTask('minify', 'default smushit');
};

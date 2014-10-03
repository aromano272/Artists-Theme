/*
 * grunt-file-append
 * http://dj7.dyndns.org
 *
 * Copyright (c) 2013 Efim Vl. Dejin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    file_append: {
      default_options: {
        files: {
          'tmp/testing1': {
            prepend: "goog.provide(\"goog.renaming\");\n",
            input: './test/fixtures/testing1'
          },
          'tmp/testing2': {
            append: "\n/*\n//@ sourceMappingURL=testing2.js.map\n*/"
          },
          'tmp/testing3': {
            prepend: function () {
              return 'test' + ' ' + 'prepend' + ' ' + 'string' + "\n\n";
            },
            append: function () {
              return "\n\n" + 'test' + ' ' + 'apppend' + ' ' + 'string';
            }
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'test/fixtures/', src: ['*2'], dest: 'tmp/'},
          {expand: true, cwd: 'test/fixtures/', src: ['*3'], dest: 'tmp/'}
        ]
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'file_append', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

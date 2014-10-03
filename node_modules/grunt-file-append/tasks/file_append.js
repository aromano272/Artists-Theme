/*
 * grunt-file-append
 * http://dj7.dyndns.org
 *
 * Copyright (c) 2013 Efim Vl. Dejin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('file_append', 'Append or prepend data to file.', function () {
    // Merge task-specific and/or target-specific options with these defaults.
//    var options = this.options({
//      punctuation: '.',
//      separator: ', '
//    });

    var data = this.data.files;

    for (var key in data) {
      var filepath = data[key].input ? data[key].input : key;

      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      }

      var prepend;
      if(typeof data[key].prepend === 'function') {
        prepend = data[key].prepend();
      } else {
        prepend = data[key].prepend ? data[key].prepend : '';
      }

      var append;
      if(typeof data[key].append === 'function') {
        append = data[key].append();
      } else {
        append = data[key].append ? data[key].append : '';
      }

      var value = prepend + grunt.file.read(filepath) + append;

      grunt.file.write(key, value);

    }

  });

};

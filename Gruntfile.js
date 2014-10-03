module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jekyll: {
      dist: {
        options: {
          src: ".",
          dest: "./_build",
          watch: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['jekyll']);
}















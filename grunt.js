/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! interp.js - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* https://github.com/modosc/interp.js\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Jonathan Schatz; Licensed MIT */'
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js']
    },
    test: {
      files: ['test/*.js']
   },
    concat: {
      dist: {
        src: ['<banner:meta.banner>',
              '<file_strip_banner:lib/Point.js>',
              '<file_strip_banner:lib/Interp.js>',
              '<file_strip_banner:lib/Lin.js>',
              '<file_strip_banner:lib/Exp.js>',
              '<file_strip_banner:lib/Log.js>',
              '<file_strip_banner:lib/Cos.js>',
              '<file_strip_banner:lib/Cub.js>'
             ],
        dest: 'dist/interp.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/interp.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint test concat min');

};

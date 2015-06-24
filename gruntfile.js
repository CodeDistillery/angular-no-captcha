'use strict';

module.exports = function (grunt){
  // NPM task loader
  require('jit-grunt')(grunt, { gitcommit: 'grunt-git' });

  grunt.initConfig({
    gitcommit: {
      build: {
        options: {
          message: 'Build new release'
        },
        files: {
          src: ['build/angular-no-captcha.min.js']
        }
      }
    },
    release: {
      options: {
        bump: true,
        add: true,
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: false,
        afterBump: ['uglify:all', 'gitcommit:build'],
        tagName: 'v<%= version %>',
        github: {
          repo: 'CodeDistillery/angular-no-captcha',
          accessTokenVar: 'GITHUB_ACCESS_TOKEN'
        }
      }
    },
    uglify: {
      all: {
        files: {
          'build/angular-no-captcha.min.js': ['src/angular-no-captcha.js']
        }
      }
    }
  });
};
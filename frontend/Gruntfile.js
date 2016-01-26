module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ts: {
      app: {
        dest: 'public/script/',
        src: ['app/script/**/*.ts', '!node_modules/**/*.ts'],
        options: {
          target: 'ES5',
          module: 'system',
          sourceMap: false,
          noImplicitAny: false,
          removeComments: false,
          moduleResolution: 'node',
          emitDecoratorMetadata: true,
          experimentalDecorators: true
        }
      }
    },

    cssmin: {
      app: {
        files: [{
          expand: true,
          cwd: 'app/style/',
          src: '**/*.css',
          dest: '.tmp/style/',
          ext: '.min.css'
        }]
      }
    },

    concat: {
      css: {
        dest: 'public/style/app.min.css',
        src: '.tmp/style/**/*.min.css'
      }
    },

    copy: {
      view: {
        files: [{
          expand: true,
          cwd: 'app/view/',
          src: '**/*.html',
          dest: 'public/view/',
          ext: '.html'
        }]
      }
    },

    watch: {
      ts: {
        tasks: ['ts'],
        files: ['app/script/**/*.ts']
      },
      view: {
        tasks: ['copy:view'],
        files: ['app/view/**/*.html']
      },
      css: {
        tasks: ['css'],
        files: ['app/style/**/*.css']
      }
    },

    clean: {
      ts: {
        src: 'public/script/**/*.js'
      },
      view: {
        src: 'public/view/**/*.html'
      },
      css: {
        src: 'public/style/**/*.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('css', ['cssmin', 'concat']);
  grunt.registerTask('build', ['clean', 'ts', 'css', 'copy', 'watch']);
};

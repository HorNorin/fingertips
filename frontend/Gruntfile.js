module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ts: {
      app: {
        dest: 'public/scripts/',
        src: ['app/scripts/**/*.ts', '!node_modules/**/*.ts'],
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
          cwd: 'app/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/',
          ext: '.min.css'
        }]
      }
    },

    concat: {
      css: {
        dest: 'public/styles/app.min.css',
        src: '.tmp/styles/**/*.min.css'
      }
    },

    copy: {
      view: {
        files: [{
          expand: true,
          cwd: 'app/views/',
          src: '**/*.html',
          dest: 'public/views/',
          ext: '.html'
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: 'app/scripts/venders/',
          src: '**/*.js',
          dest: 'public/scripts/venders/'
        }]
      },
      image: {
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**/*.png', '**/*.jpg', '**/*.gif'],
          dest: 'public/images/'
        }]
      }
    },

    watch: {
      ts: {
        tasks: ['ts'],
        files: ['app/scripts/**/*.ts']
      },
      view: {
        tasks: ['copy:view'],
        files: ['app/views/**/*.html']
      },
      css: {
        tasks: ['css'],
        files: ['app/styles/**/*.css']
      }
    },

    clean: {
      ts: {
        src: 'public/scripts/**/*.js'
      },
      view: {
        src: 'public/views/**/*.html'
      },
      css: {
        src: 'public/styles/**/*.css'
      },
      image: {
        src: [
          'public/images/**/*.png',
          'public/images/**/*.jpg',
          'public/images/**/*.gif'
        ]
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

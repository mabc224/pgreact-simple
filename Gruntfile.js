module.exports = function (grunt) {
  grunt.initConfig({

    clean: {
      frontend: {
        src: 'frontend/build'
      },
      backend: {
        src: 'backend/build'
      },
      node_modules: {
        src: 'node_modules'
      }
    },

    copy: {
      frontend: {
        expand: true,
        cwd: 'frontend/src',
        src: ['**'],
        dest: 'frontend/build'
      },
      backend: {
        expand: true,
        cwd: 'backend/src',
        src: ['**'],
        options: {
          mode: true
        },
        dest: 'backend/build'
      },
      defaultignore: {
        expand: true,
        cwd: './',
        src: ['defaultignore'],
        options: {
          mode: true
        },
        dest: 'node_modules/replace'
      }
    },

    watch: {
      backend: {
        files: ['backend/src/**/*'],
        tasks: ['copy:backend']
      },
      frontend: {
        files: ['frontend/src/**/*'],
        tasks: ['copy:frontend']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'watch']);

}
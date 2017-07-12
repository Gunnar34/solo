module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      my_target: {
        options: {
          mangle: false
        }, // end options
        // destination: src
        files: {
          'public/build/app.min.js': ['public/vendors/jquery-3.2.1.min.js', 'public/vendors/angular.min.js',
          'public/vendors/angular-route.min.js', 'public/vendors/materialize.min.js', 'public/vendors/angular-materialize.min.js',
          'public/vendors/materialize.clockpicker.js', 'public/vendors/ng-easy-cal.js', 'public/vendors/moment.min.js',
          'public/scripts/script.js', 'public/scripts/controllers/FBcontroller.js', 'public/scripts/controllers/calendarController.js',
          'public/scripts/controllers/placesController.js', 'public/scripts/services/FbService.js', 'public/scripts/services/locationService.js',
          'public/scripts/services/calendarService.js', 'public/scripts/services/userService.js']
        } // end files
      } // end my_target
    }, // end uglify
  }); // end module.exports

  // specify the plugins used
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // set which tasks to run when we grunt
  grunt.registerTask('default', ['uglify']);
};

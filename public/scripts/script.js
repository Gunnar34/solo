var app = angular.module('materializeApp', ['ui.materialize']);

// app.config(function ($routeProvider){
//   $routeProvider.when('/', {
//     templateUrl: 'view/home.html',
//     controller: 'bodyController as bc'
//   }).when('/gettingStarted', {
//     templateUrl: 'view/gettingStarted.html',
//     controller: 'bodyController as bc'
//   });
// });

app.controller('bodyController', function () {
  var vm = this;
  vm.showMenu = false;

  vm.displayMenu = function(){
    vm.showMenu = !vm.showMenu;
  };

});

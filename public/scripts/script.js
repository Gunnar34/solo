var app = angular.module('materializeApp', ['ui.materialize', 'ngRoute']);

app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/home.html'
  }).when('/gettingStarted', {
    templateUrl: 'view/gettingStarted.html'
  }).when('/facebook', {
    templateUrl: 'view/facebook.html',
    controller: 'facebookController as fb'
  });
});

app.controller('bodyController', bodyController);

function bodyController(){
  var vm = this;

  vm.displayMenu = function(){
      vm.showMenu = !vm.showMenu;
    }; //hide show menu

}

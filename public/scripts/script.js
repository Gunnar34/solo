var app = angular.module('myApp', ['ui.materialize', 'ngRoute', 'ngEasyCal']);

app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/partials/home.html'
  }).when('/gettingStarted', {
    templateUrl: 'view/partials/gettingStarted.html'
  }).when('/login', {
    templateUrl: 'view/partials/login.html'
  }).when('/register', {
    templateUrl: 'view/partials/register.html'
  }).when('/facebook', {
    templateUrl: 'view/partials/facebook.html',
    controller: 'facebookController as fb'
  }).when('/places', {
    templateUrl: 'view/partials/places.html',
    controller: 'googleMapController as gm'
  }).when('/saved', {
    templateUrl: 'view/partials/saved.html',
    controller: 'calendarController as cc'
  });
});

app.controller('bodyController', bodyController);

function bodyController($window, $location, userService){
  var vm = this;
  vm.loggedIn = localStorage.getItem('loggedIn');
  vm.userNameStored = localStorage.getItem('username');

  vm.register = function() {
		var credentials = {
			username: vm.username,
			password: vm.password
		};
		userService.registerUser(credentials).then(function() {
			vm.username = "";
			vm.password = "";
      $location.path('/login');
      alertify.success('Successful Register!');
		});
	};

  vm.logIn = function() {
		var credentials = {
			username: vm.logUsername,
			password: vm.logPassword
		};
		userService.logIn(credentials).then(function(response) {
      if (response.data.username) {
        vm.wrong = false;
        vm.logUsername = "";
  			vm.logPassword = "";
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('ID', response.data.userID);
        $location.path('/');
        alertify.success('Successful Login!');
        vm.loggedIn = localStorage.getItem('loggedIn');
        vm.userNameStored = localStorage.getItem('username');
      }
      else {
        vm.wrong = true;
        vm.logPassword = "";
      }
		});
	};

  vm.logout = function() {
    localStorage.setItem('loggedIn', false);
    localStorage.setItem('username', '');
    localStorage.setItem('ID', '');
    $window.location.reload();
  };
}

app.service('userService', function($http) {
  var sv = this;

  sv.registerUser = function(credentials) {
		console.log('in service registerUser', credentials);
		return $http.post('/register', credentials).then(function(response) {
			console.log('back from register attempt:', response);
		});
	};

  sv.logIn = function(credentials) {
		console.log('in service sendLogIn');
		return $http.post('/login', credentials).then(function(response) {
      return response;
		});
	};

});

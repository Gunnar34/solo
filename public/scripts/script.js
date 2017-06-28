var app = angular.module('materializeApp', ['ui.materialize', 'ngRoute']);

app.config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'view/home.html'
  }).when('/gettingStarted', {
    templateUrl: 'view/gettingStarted.html'
  }).when('/facebook', {
    templateUrl: 'view/facebook.html'
  });
});

app.controller('bodyController', bodyController);

function bodyController(FbService, locService){
  var vm = this;
  var lat;
  var lon;
  vm.events = [];
  vm.showMenu = false;

  vm.init = function(){
    FbService.getAccess();
    navigator.geolocation.getCurrentPosition(findLocation);
  }; //pageload function

  vm.togglePannel = function(index){
    vm.events[index].eventPannel = !vm.events[index].eventPannel;
  }; //flip divs for facebook events

  vm.displayMenu = function(){
    vm.showMenu = !vm.showMenu;
  }; //hide show menu

  function findLocation(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    vm.getEvents();
  } //find current location


  vm.getEvents = function (){
    var time = (Math.floor(Date.now() / 1000)) + 172800;
    console.log('unix time: ', time);
    if (lat === undefined || lon === undefined) {
      lat = 44.986656;
      lon = -93.258133;
      }
    FbService.getEvents(time, lat, lon).then(function(res){
      vm.events = res;
      console.log(res);
      });
  }; //get facebook events with service and API get

  vm.getLocation = function(){
    locService.getKey().then(function(res){
      var address = vm.location;
      vm.location = '';
      locService.getLocation(address).then(function(res){
        lat = res.lat;
        lon = res.lng;
        }).then(vm.getEvents());
    }); //get addrress to lon lat with google api, then events

  };

}

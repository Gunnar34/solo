app.controller('googleMapController', googleMap);

var map;
var infowindow;
var pyrmont;
var distance = 1609.34;
var type = ['restaurant'];
var zoom = 15;
var controllerContainer;
var loading = true;

function googleMap(locService, $interval, $http){
  var vm = this;
  controllerContainer = this;

  loadTimer = $interval(function () {
    vm.loading = loading;
    if (!loading) {
      $interval.cancel(loadTimer);
    }
  }, 10);

  vm.saveEvent = function(){
    if (vm.startDate === undefined || vm.startTime === undefined || vm.endDate === undefined ||
    vm.endTime === undefined || vm.description === undefined) {
      alertify.notify('Please fill out all fields', 'error', 5);
    }
    else {
      var id = localStorage.getItem('ID');
      var x = vm.places[vm.index];
      var typeCheck = type[0];
      console.log(typeCheck);
      if (typeCheck == "restaurant") {
        var image = '../../images/Restaurant.png'
      };
      if (typeCheck == "movie_theater") {
        var image = '../../images/movieTheatre.png'
      };
      if (typeCheck == "art_gallery") {
        var image = '../../images/artGallery.jpg'
      };
      if (typeCheck == "bowling_alley") {
        var image = '../../images/bowling.png'
      };
      if (typeCheck == "museum") {
        var image = '../../images/museum.png'
      };
      if (typeCheck == "night_club") {
        var image = '../../images/nightClub.png'
      };
      if (typeCheck == "park") {
        var image = '../../images/park.png'
      };
      if (typeCheck == "cafe") {
        var image = '../../images/cafe.png'
      };
      var start = dateFormat(vm.startDate, vm.startTime);
      var end = dateFormat(vm.endDate, vm.endTime); //reformat dates to match fb ones in data base
      console.log(start, end);
      var placeEvent = {
         start: start,
         end: end,
         title: x.name,
         description: vm.description,
         image: image,
         userID: id,
         info: x.name, //set equal to name so more info can be google search instead of fb link.
         type: 'google',
         location: x.vicinity
      };
      $http.post('/events', placeEvent).then(function(response){
        console.log(response);
        vm.startDate = undefined;
        vm.startTime = undefined;
        vm.endDate = undefined;
        vm.endTime = undefined;
        vm.description = undefined;
        document.getElementById('id01').style.display='none'
      });
    }
  }

  function dateFormat(date, time){
    var months = { 'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06', 'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12' };
    console.log(date);
    var a = date.split(' ');
    var c = a.pop();
    var b = a.pop();
    var monthName = b.substring(0, b.length - 1);
    var monthNumber = months[monthName];
    console.log(monthNumber);
    var newDate = c + '-' + monthNumber + '-' + a;
    var newTime = 'T' + time + ':00-0500';
    var newFormat = newDate + newTime;
    return newFormat;
  }

  vm.create = function(){
    resetVars();
    locService.getKey().then(function(res){
      if (vm.location) {
        address = vm.location;
        vm.location = '';
        locService.getLocation(address).then(function(res){
          pyrmont = {
            lat: res.lat,
            lng: res.lng
          };
          initMap();
        });
      }
      else {
        initMap();
      }
      });
  };

  function resetVars(){
    if (vm.type) {
      type[0] = vm.type;
    }
    if (vm.distance) {
      distance = vm.distance;
    }
    console.log(type);
  };

   vm.getLocation = function(){
    loading = true;
    navigator.geolocation.getCurrentPosition(findLocation);
  };

  function findLocation(position) {
    console.log(position);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    vm.place;
    pyrmont = {
      lat: lat,
      lng: lon
    };
    console.log(lat, lon);
    loading = false;
    initMap();
  }

  function initMap() {
    if (distance <= 1611) {
      zoom = 15;
      console.log(zoom);
      }
    if (distance >= 1611 && distance <= 3220) {
        zoom = 14;
        console.log(zoom);
      }
    if (distance >= 3220 && distance <= 8048) {
        zoom = 13;
        console.log(zoom);
      }
    if (distance >= 8048 && distance <= 16095) {
        zoom = 12;
        console.log(zoom);
      }

    map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: zoom,
      scrollwheel: false
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: distance,
      type: type
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      vm.places = results;
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i], i);
      }
    }
  }

  function createMarker(place, index) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      vm.index = index;
      infowindow.setContent('<div class="center-align"><h4>' + place.name + '</h4>' +
      '<p class="flow-text placeText">Rating: ' + place.rating + '</p>' +
      '<p class="flow-text placeText">Address: ' + place.vicinity + '</p>' +
      '<a href = "http://www.google.com/search?q=' + place.name + '" target="_blank"><p class="flow-text placeText">Link in google</p></a>' +
      '<br><button onclick="document.getElementById(\'id01\').style.display=\'block\'" class="btn blue">Save</button><br></div>');
      infowindow.open(map, this);
    });
  }

}; //end controller

function getLocation(){
  controllerContainer.getLocation();
}

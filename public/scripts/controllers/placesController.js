app.controller('googleMapController', googleMap);

var map;
var infowindow;
var pyrmont;
var distance = 1609.34;
var type = ['restaurant'];
var zoom = 15;
var controllerContainer;
var loading = true;

function googleMap(locService, $interval){
  var vm = this;
  controllerContainer = this;

  loadTimer = $interval(function () {
    vm.loading = loading;
    if (!loading) {
      $interval.cancel(loadTimer);
    }
  }, 100);

  vm.save = function(){
    console.log('save');
    
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
        });
        initMap();
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
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      console.log(place);
      infowindow.setContent('<div class="center-align"><h4>' + place.name + '</h4>' +
      '<p class="flow-text placeText">Rating: ' + place.rating + '</p>' +
      '<p class="flow-text placeText">Address: ' + place.vicinity + '</p>' +
      '<a href = "http://www.google.com/search?q=' + place.name + '" target="_blank"><p class="flow-text placeText">Link in google</p></a>' +
      '<br><button onclick="saveEvent()" class="btn">Save</button><br>  </div>');
      infowindow.open(map, this);
    });
  }

}; //end controller

function saveEvent(){
  controllerContainer.save();
}

function getLocation(){
  controllerContainer.getLocation();
}

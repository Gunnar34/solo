app.controller('googleMapController', googleMap);

function googleMap(){
  var vm = this;

  vm.create = function(){
    resetVars();
    initMap();
  };

  function resetVars(){
    type[0] = vm.type;
    distance = vm.distance;
    console.log(type);
  }

}

var map;
var infowindow;
var pyrmont = {lat: 44.93964219, lng: -93.1360431};
var distance = 1609.34;
var type = ['restaurant'];
var zoom = 15;

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
    zoom: zoom
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
    '<br><button class="btn">Save</button><br>  </div>');
    infowindow.open(map, this);
  });
}

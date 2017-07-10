app.service('locService', function($http) {
  var sv = this;
  var key;
  var position;

  sv.getKey = function(){
  return $http.get('/gmap').then(function(res){
    key = res.data;
    return 'success';
    });
  };

  sv.getLocation = function(address){
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key;
    return $http.get(url).then(function(response){
      console.log('get location', response.data.results[0].geometry.location);
        return (response.data.results[0].geometry.location);
        });
    };

  sv.storeGeoLocation = function(position){
    console.log(position);
    position = position;
  }

  // sv.getGeoLocation = function(){
  //   return navigator.geolocation.getCurrentPosition(function(position){
  //     lat = position.coords.latitude;
  //     lon = position.coords.longitude;
  //     console.log(lat, lon);
  //     var position = {
  //       lat: lat,
  //       lon: lon
  //     };
  //     return position;
  //   });
  // }

});

app.service('locService', function($http) {
  var sv = this;
  var key;

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


});

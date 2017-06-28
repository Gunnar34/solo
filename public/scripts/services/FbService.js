app.service('FbService', function($http) {
  var sv = this;
  var access;

  sv.getAccess = function(){
    console.log('in access');
    $http.get('/access').then(function(response){
      access = response.data;
    });
  };

  sv.getEvents = function(time, lat, lon){
    var url = 'http://localhost:3000/events?lat=' + lat + '&lng=' + lon + '&distance=9000&until=' +
               time + '&sort=popularity&accessToken=' + access;

    return $http.get(url).then(function(res){
      var data = [];
      for (var i = 0; i < res.data.events.length; i++) {
        res.data.events[i].startTime = (dateFormat(res.data.events[i].startTime, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        res.data.events[i].endTime = (dateFormat(res.data.events[i].endTime, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
        if (res.data.events[i].category === null) {
          res.data.events[i].category = 'unknown';
        }
        if (res.data.events[i].description === null) {
          res.data.events[i].description = "Sorry there's no description for this event.";
        }
        if (res.data.events[i].description.length > 1235) {
          res.data.events[i].description = res.data.events[i].description.substring(0, 1235);
          res.data.events[i].description += '...';
        }
        res.data.events[i].category = res.data.events[i].category.replace("_", " ");
        res.data.events[i].eventPannel = true;
        data.push(res.data.events[i]);
      }
      console.log('getevents', data);
      return (data);
    });
  };
});

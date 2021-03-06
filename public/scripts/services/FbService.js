app.service('FbService', function($http) {
  var sv = this;
  var access;

  sv.saveEvent = function(FbEvent){
    console.log('in save event');
    $http.post('/events', FbEvent).then(function(response){
      console.log(response);
    });
  };

  sv.getAccess = function(){
    console.log('in access');
    return $http.get('/access').then(function(response){
      access = response.data;
      return'success'
    });
  };

  sv.getEvents = function(time, time2, lat, lon){
    var url = 'fb/events?lat=' + lat + '&lng=' + lon + '&distance=90000&since=' + time + '&until=' +
               time2 + '&sort=popularity&accessToken=' + access;

    return $http.get(url).then(function(res){
      var data = [];
      for (var i = 0; i < res.data.events.length; i++) {
        // res.data.events[i].startTimeDisplay = new Date(res.data.events[i].startTime);
        // res.data.events[i].startTimeDisplay = (dateFormat(res.data.events[i].startTimeDisplay, "dddd, mmmm dS, yyyy, h:MM TT"));
        // res.data.events[i].endTimeDisplay = new Date(res.data.events[i].endTime);
        // res.data.events[i].endTimeDisplay = (dateFormat(res.data.events[i].endTimeDisplay, "dddd, mmmm dS, yyyy, h:MM TT"));
        if (res.data.events[i].category === null) {
          res.data.events[i].category = 'unknown';
        }
        if (res.data.events[i].description === null) {
          res.data.events[i].description = "Sorry there's no description for this event.";
        }
        res.data.events[i].category = res.data.events[i].category.replace("_", " ");
        res.data.events[i].eventPannel = true;
        data.push(res.data.events[i]);
      }
      console.log('after loop', data);
      return (data);
    });
  };
});

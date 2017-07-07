app.service('calendarService', function($http) {
  var sv = this;

  sv.getEvents = function(id){
     return $http.get('/events/' + id).then(function(response){
      console.log(response);
      return response.data;
    });
  }


  sv.deleteEvent = function(id){
    return $http.delete('/events/' + id).then(function(response){
     return response;
  });
  }

});

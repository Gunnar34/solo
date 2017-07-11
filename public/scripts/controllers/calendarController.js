app.controller('calendarController', calendarController);

function calendarController(calendarService){
  var vm = this;
  vm.screenWidth = screen.width - 20;
  vm.events = [];

  vm.date = function(day){
    console.log(day);
  }

  vm.getEvents = function(){
    var id = localStorage.getItem('ID');
    calendarService.getEvents(id).then(function(res){
      console.log(res);
      for (var i = 0; i < res.length; i++) {
        if (res[i].type == 'facebook') {
          console.log(res[i].type);
          res[i].moreInfo = "https://www.facebook.com/events/" + res[i].info;
        }
        if (res[i].type == 'google') {
          res[i].moreInfo = "http://www.google.com/search?q=" + res[i].info;
          console.log(res[i].type);
        }
        var CalEvent = {
          startDate: res[i].startDate,
          endDate: res[i].endDate,
          title: res[i].title,
          description: res[i].description,
	        image: res[i].image,
          ID: res[i]._id,
          info: res[i].moreInfo,
          location: res[i].location
        };
        vm.events.push(CalEvent)
      };
      console.log(vm.events);
    });
  };

}

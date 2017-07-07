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
        console.log(new Date(res[i].startDate));
        var CalEvent = {
          startDate: new Date(res[i].startDate),
          endDate: new Date(res[i].endDate),
          title: res[i].title,
          description: res[i].description,
	        image: res[i].image,
          ID: res[i]._id,
          info: res[i].info,
          location: res[i].location
        };
        vm.events.push(CalEvent)
      };
      console.log(vm.events);
    });
  };

}

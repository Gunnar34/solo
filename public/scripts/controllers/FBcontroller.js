app.controller('facebookController', facebookController);

  function facebookController(FbService, locService){
    var vm =this;
    var lat;
    var lon;
    vm.events = [];
    vm.showMenu = false;
    vm.loading = false;
    vm.times = [172800, 604800, 1209600, 2629746];

    vm.init = function(){
      vm.loading = true;
      navigator.geolocation.getCurrentPosition(findLocation);
    }; //pageload function

    vm.init();

    vm.togglePannel = function(index){
      vm.events[index].eventPannel = !vm.events[index].eventPannel;
    }; //flip divs for facebook events

    function findLocation(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      FbService.getAccess().then(function(){
        vm.getEvents();
      });
    } //find current location


    vm.getEvents = function (){
      if (vm.timeSelect === undefined || vm.timeSelect === null) {
        var time = (Math.floor(Date.now() / 1000))
        var now = new Date();
        var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var timestamp = startOfDay / 1000;
        var time2 = timestamp + 86400;
      }
      else {
        var time = (new Date(vm.timeSelect)) / 1000
        var time2 = time + 86400;
      }
      if (lat === undefined || lon === undefined) {
        lat = 44.986656;
        lon = -93.258133;
        }
        console.log('time2', time2);
        console.log('time', time);
      FbService.getEvents(time, time2, lat, lon).then(function(res){
        vm.loading = false;
        vm.events = res;
        console.log(res);
        });
    }; //get facebook events with service and API get

    vm.getLocation = function(){
      vm.loading = true;
      vm.events = [];
      if (vm.location) {
        locService.getKey().then(function(res){
          var address = vm.location;
          vm.location = '';
          locService.getLocation(address).then(function(res){
            lat = res.lat;
            lon = res.lng;
            vm.getEvents();
          });
        }); //get addrress to lon lat with google api, then events
      }
      else {
        vm.getEvents();
      }
    };

    vm.saveEvent = function(index){
      if (localStorage.getItem('loggedIn') == 'true') {
        var id = localStorage.getItem('ID');
        var x = vm.events[index];
        console.log(x);
        var FbEvent = {
           start: x.startTime,
           end: x.endTime,
           title: x.name,
           description: x.description,
  	       image: x.coverPicture,
           userID: id,
           info: x.id,
           type: 'facebook',
           location: x.venue.location.street + ' ' + x.venue.location.city + ' ' + x.venue.location.zip
        };
        vm.events[index].saved = true;
        FbService.saveEvent(FbEvent);
      }
    else {
      alert('Please Login Before saving events')
    }
    };

  }

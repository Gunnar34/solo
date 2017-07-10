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
      FbService.getAccess();
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
      var position = {
        lat: lat,
        lon: lon
      };
      vm.getEvents();
      locService.storeGeoLocation(position);
    } //find current location


    vm.getEvents = function (){
      if (vm.timeSelect === undefined) {
        var timeSelect = 172800;
      }
      else {
        var timeSelect = vm.timeSelect;
      }
      var time = (Math.floor(Date.now() / 1000)) + Number(timeSelect);
      console.log('unix time: ', time);
      if (lat === undefined || lon === undefined) {
        lat = 44.986656;
        lon = -93.258133;
        }
        console.log(lat, lon);
      FbService.getEvents(time, lat, lon).then(function(res){
        vm.loading = false;
        vm.events = res;
        console.log(res);
        });
    }; //get facebook events with service and API get

    vm.getLocation = function(){
      vm.loading = true;
      vm.events = [];
      locService.getKey().then(function(res){
        var address = vm.location;
        vm.location = '';
        locService.getLocation(address).then(function(res){
          lat = res.lat;
          lon = res.lng;
          vm.getEvents();
        });
      }); //get addrress to lon lat with google api, then events

    };

    vm.saveEvent = function(index){
      if (localStorage.getItem('loggedIn') == 'true') {
        var id = localStorage.getItem('ID');
        var x = vm.events[index];
        var FbEvent = {
           start: x.startTime,
           end: x.endTime,
           title: x.name,
           description: x.description,
  	       image: x.coverPicture,
           userID: id,
           info: x.id,
           location: {city: x.venue.location.city, street: x.venue.location.street, zip: x.venue.location.zip}
        };
        vm.events[index].saved = true;
        FbService.saveEvent(FbEvent);
      }
    else {
      alert('Please Login Before saving events')
    }
    };

  }

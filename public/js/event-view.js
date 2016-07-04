(function(module) {

  var EventView = {};

  // TODO: Do we need seperate inits for the view and controller?
  EventView.initEventView = function (ctx, next) {
    console.log('EventView.initEventView called!');

    // Generate shareable link
    $('#share-url').val(
      window.location.protocol +
      '//' + window.location.host +
      '/eventhash/' +
      EventController.getCookie('eventHash')
    );
    $('#share-url').on('focus', function(){
      this.select();
    });

    // Set listener on admin input submit button
    $('#admin-input').on('submit', EventController.handleSubmitComment);

    if (next) next();
  };

  //links up with our google maps api and makes initial location over portland
  var map; //??
  EventView.triggerMapResize = function(){
    if (map){
      google.maps.event.trigger(map, 'resize');
    }
  };

  //allows us to use submission form to input address, this function converts our address to lat & long
  function geocodeAddress(geocoder, resultsMap) {
    var address = $('#address').val();
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  module.EventView = EventView;
})(window);

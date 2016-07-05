(function(module) {

  var EventView = {};
  var $tatus = $('#status');

  EventView.initEventView = function () {
    console.log('EventView.initEventView called!');

    $('.page').hide();
    $('#event').show();
    $('#details').show();
    $('#googleAPI').show();
    EventView.triggerMapResize();

    // Generate shareable link
    $('#share-url').val(Event.urlHash);
    $('#share-url ').on('focus', function(){
      this.select();
    });

    // Set listener on admin input submit button
    $('#admin-input').on('submit', Event.handleSubmitComment);

    // Display the event name and user name.
    $('#event-name').text(Event.eventName);
    $('#user-id h4').text(User.userName);

    // Set up the Rsvp status button colors for the current user
    User.getRsvpStatus(function(rsvpStatus){
      if (rsvpStatus == 1) {
        $tatus.removeClass('blank');
        $tatus.addClass('maybe');
      } else if (rsvpStatus == 2) {
        $tatus.removeClass('blank');
        $tatus.addClass('approve');
      } else if(rsvpStatus == -1) {
        $tatus.removeClass('blank');
        $tatus.addClass('approve');}
    });

    // Set listener for Rsvp button
    $tatus.on('click', function() {
      User.updateRsvp(function(result) {
        EventView.updateButton(result);
      });
    });
  };

  EventView.updateButton = function (newStatus) {
    // TODO: Consider using newStatus instead of toggles?
    if ($tatus.hasClass('blank')) { //If blank -> maybe
      $tatus.toggleClass('blank maybe');
      $tatus.children().text('Maybe');
      $('#status-instructions').remove();
    } else if ($tatus.hasClass('maybe')) { //If maybe -> going
      $tatus.toggleClass('maybe approve');
      $tatus.children().text('Yep');
    } else if ($tatus.hasClass('approve')) { //if going -> not going
      $tatus.toggleClass('approve disapprove');
      $tatus.children().text('Nope');
    } else if ($tatus.hasClass('disapprove')) { //if not going -> blank
      $tatus.toggleClass('disapprove blank');
      $tatus.children().text('Going?');
    }
  };

  //links up with our google maps api and makes initial location over portland
  var map;

  EventView.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {
        lat: 45.5231,
        lng: -122.6765
      },
    });
    var geocoder = new google.maps.Geocoder();
    $('#submit-event').on('submit', function(event) {
      event.preventDefault();
      geocodeAddress(geocoder, map);
      var address = $('#address').val();
      console.log(address);
    });
  };

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

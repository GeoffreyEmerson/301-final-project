//links up with our google maps api and makes initial location over portland
var map;
function triggerMapResize(){
  if (map){
    google.maps.event.trigger(map, 'resize');
  }
}
function initMap() {
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
  });
}
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

function createEvent(eventName, callback) {
  $.ajax({
    url: '/api/events',
    type: 'POST',
    data: {name: eventName},
    cache: false
  })
  .done( function (data) {
    // call the callback function here
    $('#event').attr('data-eventhash',data.event.hash);
    $('#event').attr('data-eventname',data.event.name);
    if (callback) callback();
  })
  .fail( function(jqXHR, textStatus, errorThrown) {
    console.warn('Ajax call failed: POST /api/events');
    console.log('jqXHR.responseText:',jqXHR.responseText);
    console.log('textStatus:',textStatus);
    console.log('errorThrown:',errorThrown);
    // call the error version of the callback if any
  });
};

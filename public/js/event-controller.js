function initEventPage() {
  showPage($('#event'));
  $('#details').show();
  $('#googleAPI').show();
  triggerMapResize();
};

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
    saltDom('#event','event',data.event.hash,data.event.name);
    setCookie('eventHash', data.event.hash, 10);
    setCookie('eventName', data.event.name, 10);
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

function createUserName(nameArg, callback) {
  $.ajax({
    url: '/api/users',
    type: 'POST',
    data: {name: nameArg},
    cache: false
  })
  .done( function (data) {
    saltDom('#user-id','user',data.user.userHash,data.user.name);
    setCookie('userHash', data.user.userHash, 10);
    setCookie('userName', data.user.name, 10);
    if (callback) callback();
  })
  .fail( function() {
    console.error('Name creation failed (event-controller.js)');
  });
};

function saltDom(element,type,hash,name) {
  $(element).attr('data-' + type + 'Hash',hash);
  $(element).attr('data-' + type + 'Name',name);
}

// Cookie functions adapted from http://www.w3schools.com/js/js_cookies.asp
function setCookie(cookieName, cookieValue, days) {
  var date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + date.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + '; ' + expires;
}

function getCookie(cookieName) {
  var name = cookieName + '=';
  var crumbArray = document.cookie.split(';');
  for(var i = 0; i < crumbArray.length; i++) {
    var crumb = crumbArray[i];
    while (crumb.charAt(0) == ' ') {
      crumb = crumb.substring(1);
    }
    if (crumb.indexOf(name) == 0) {
      return crumb.substring(name.length,crumb.length);
    }
  }
  return '';
}

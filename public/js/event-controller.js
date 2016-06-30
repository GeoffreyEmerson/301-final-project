(function(model){

  var EventController = {};

  EventController.initEventPage = function(ctx,callback) {
    // TODO: Redirect user if:
    //   No hash in URL, and
    //   No hash in DOM, and
    //   No hash in cookie

    console.log(ctx);
    if (ctx && ctx.params.eventHash) {
      $.ajax({
        url: '/api/events/' + ctx.params.eventHash,
        type: 'GET',
        cache: false
      })
      .done( function (data) {
        // call the callback function here
        console.log(data);
        saltDom('#event','event',data.event.hash,data.event.name);
        setCookie('eventHash', data.event.hash, 10);
        setCookie('eventName', data.event.name, 10);
        if (callback) callback();
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.warn('Ajax call failed: GET /api/events/' + ctx.params.eventHash);
        console.log('jqXHR.responseText:',jqXHR.responseText);
        console.log('textStatus:',textStatus);
        console.log('errorThrown:',errorThrown);
        // call the error version of the callback if any
      });
    } else {
      console.log('No ctx object or ctx.params.eventHash parameter.'); // Remove this in production.
    };
    showPage($('#event'));
    $('#details').show();
    $('#googleAPI').show();
    EventController.triggerMapResize();
    // TODO: If no userName, go to name input view.
  };

  //links up with our google maps api and makes initial location over portland
  var map;
  EventController.triggerMapResize = function(){
    if (map){
      google.maps.event.trigger(map, 'resize');
    }
  };

  EventController.initMap = function() {
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

  EventController.createEvent = function(eventName, callback) {
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

  EventController.createUserName = function(nameArg, callback) {
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

  EventController.getCookie = function(cookieName) {
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
  };

  model.EventController = EventController;
})(window);

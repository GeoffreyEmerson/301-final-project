(function(model){

  var EventController = {};

  // TODO: Consider removing this method. Either this one or the event-view init.
  EventController.initEventPage = function(ctx,callback) {
    console.log('initEventPage called.');

    // Redirect user if:
    //   No hash in URL, and
    //   No hash in DOM, and
    //   No hash in cookie

    if (ctx && ctx.params.eventHash) {
      console.log('Context:',ctx);
      showLandingPage();
      getEventData(ctx.params.eventHash,callback); // ajax call for event data.
    } else {
      console.log('No ctx object or ctx.params.eventHash parameter.'); // Remove this in production.
      // User gets here if they have entered the app from someplace other than making a new event.
      // Check for info in the DOM.
      if ( $('#event').attr('data-eventHash') ) {
        console.log('eventHash found in DOM.');
        // Here we get the eventHash from the DOM.
        showLandingPage();
        // console.log('callback is currently:',callback);
        getEventData($('#event').attr('data-eventHash'),callback);
      } else {
        console.log('No eventHash in DOM.');
        // Now check for cookie.
        if (EventController.getCookie('eventHash')) {
          console.log('eventHash found in cookie!');
          // Here we get the eventHash from a cookie.
          showLandingPage();
          getEventData(EventController.getCookie('eventHash'),callback);
          var userHash = EventController.getCookie('userHash');
          var userName = EventController.getCookie('userName');
          if(userHash && userName) {
            // TODO: Get data from proper source.
            throw 'saltDom is deprecated';
            saltDom('#user-id','user',userHash,userName);
          }
        } else {
          console.warn('No cookie either. Redirect to main page.');
          page.show('/'); // TODO: Fix this as a proper SPA redirect.
          if (callback) callback();
        };
      };
    };

    function showLandingPage() {
      $('.page').hide();
      $('#event').show();
      $('#details').show();
      $('#googleAPI').show();
      EventController.triggerMapResize();
    };

    // TODO: If no userName, go to name input view.

    console.log('initEventPage completed.');
  };

  // TODO: Has this been replaced by Session?
  function getEventData(eventHash,callback) {
    $.ajax({
      url: '/api/events/' + eventHash,
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      // call the callback function here
      console.log('data:',data);
      if (data.event && data.event.hash) {
        // TODO: Get data from proper source.
        throw 'saltDom is deprecated';
        saltDom('#event','event',data.event.hash,data.event.name);
        setCookie('eventHash', data.event.hash, 10);
        setCookie('eventName', data.event.name, 10);
        getTopicId(data.event.hash,callback);
      } else {
        // Hopefully this will never happen.
        console.error('Ajax call successful, but no eventHash returned!');
        if (callback) callback();
      };
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: GET /api/events/' + eventHash);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
    });

    function getTopicId(eventHash,callback) {
      $.ajax({
        url: '/api/topics/',
        type: 'GET',
        cache: false
      })
      .done( function (data) {
        // call the callback function here
        console.log('getTopicId data:',data);
        var topicId = data.topics.filter(function(topic){
          if(topic.eventHash == eventHash) return true;
        });
        if (topicId.length) {
          $('#timing').attr('data-topicId',topicId[0]._id);
          if (callback) callback();
        } else {
          // Hopefully this will never happen.
          console.error('GET /api/topics/ Ajax call successful, but no topicIds returned!');
          if (callback) callback();
        };
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.warn('Ajax call failed: GET /api/events/' + eventHash);
        console.log('jqXHR.responseText:',jqXHR.responseText);
        console.log('textStatus:',textStatus);
        console.log('errorThrown:',errorThrown);
        // call the error version of the callback if any
        if (callback) callback();
      });
    }
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
      var address = $('#address').val();
      console.log(address);
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

  // EventController.createEvent = function(eventName, callback) {
  //   $.ajax({
  //     url: '/api/events',
  //     type: 'POST',
  //     data: {name: eventName},
  //     cache: false
  //   })
  //   .done( function (data) {
  //     // call the callback function here
  //     saltDom('#event','event',data.event.hash,data.event.name);
  //     setCookie('eventHash', data.event.hash, 10);
  //     setCookie('eventName', data.event.name, 10);
  //     createTimingTopic(data.event.hash, 'eventStartTopic', 'Click on the calendar to indicate your availability.', callback);
  //   })
  //   .fail( function(jqXHR, textStatus, errorThrown) {
  //     console.warn('Ajax call failed: POST /api/events');
  //     console.log('jqXHR.responseText:',jqXHR.responseText);
  //     console.log('textStatus:',textStatus);
  //     console.log('errorThrown:',errorThrown);
  //     // call the error version of the callback if any
  //     if (callback) callback();
  //   });
  // };

  EventController.createTimingTopic = function(eventHashArg, nameArg, descriptionArg ,callback) {
    $.ajax({
      url: '/api/topics',
      type: 'POST',
      data: {name: nameArg, description:descriptionArg, eventHash:eventHashArg},
      cache: false
    })
    .done( function (data) {
      console.log('creating topic ajax call. returned data:',data);
      $('#timing').attr('data-topicId',data.topic._id);
      // saltDom('#event','event',data.event.hash,data.event.name);
      // call the callback function here
      if (callback) callback();
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
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
      // TODO: Get data from proper source.
      throw 'saltDom is deprecated';
      saltDom('#user-id','user',data.user.userHash,data.user.name);
      setCookie('userHash', data.user.userHash, 10);
      setCookie('userName', data.user.name, 10);
      if (callback) callback();
    })
    .fail( function() {
      console.error('Name creation failed (event-controller.js)');
      if (callback) callback();
    });
  };

  // function saltDom(element,type,hash,name) {
  //   $(element).attr('data-' + type + 'Hash',hash);
  //   $(element).attr('data-' + type + 'Name',name);
  // }

  // Cookie functions adapted from http://www.w3schools.com/js/js_cookies.asp
  function setCookie(cookieName, cookieValue, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires + '; path=/';
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

  $('#admin-input').on('submit',handleSubmitComment);
  // $('#event-description').on('keydown', function(event){
  //   if(event.keyCode === 13) { // 13 is the 'enter' or 'return' key.
  //     handleSubmitComment(event);
  //   }
  // });
  function handleSubmitComment(event) {
    event.preventDefault();
    var date = $('#date').val().trim();
    var times = $('#times').val().trim();
    var description = $('#event-description').val().trim();
    console.log(date, times, eventDescription);
    // alert('Success!');
  };
  //TODO use this handlebars method to ger real data from our user database
  function userTest(userName, status, css) {
    this.userName = userName;
    this.status = status;
    this.css = css;
  };
  var testObject = [
    new userTest('Bob', 'attending','approve'),
    new userTest('Bill', 'maybe', 'maybe'),
    new userTest('Sarah', 'no', 'disapprove')
  ];
  var newTemplate = $('#guests').html();
  var compiled = Handlebars.compile(newTemplate);
  var guestList = compiled({testObject:testObject});
  $('#user-info').append(guestList);

  model.EventController = EventController;
})(window);

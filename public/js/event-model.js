(function(module) {

  function EventObject(){}

  // This method creates a new record in the database and stores the session information.
  EventObject.prototype.createEvent = function(eventName, callback) {
    var currentEvent = this;
    $.ajax({
      url: '/api/events',
      type: 'POST',
      data: {name: eventName},
      cache: false
    })
    .done( function (data) {
      console.assert(data.event.name && data.event.hash, {'message':'Problem creating event record','data.event.name':data.event.name,'data.event.hash':data.event.hash});
      // After successfully creating a new record for the event, store the info
      Object.keys(data.event).forEach(function(key){
        currentEvent[key] = data.event[key];
      });
      currentEvent.urlHash = window.location.protocol + '//' + window.location.host + '/eventhash/' + currentEvent.hash;
      currentEvent.setSessionEvent();
      if (callback) callback(currentEvent);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events,', this.name);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentEvent);
    });
  };

  EventObject.prototype.loadEventFromDB = function(callback){
    currentEvent = this;
    if (currentEvent.hash) {
      $.ajax({
        url: '/api/events/' + currentEvent.hash,
        type: 'GET',
        cache: false
      })
      .done( function (data) {
        if (data.event.name && data.event.hash) {
          Object.keys(data.event).forEach(function(key){
            currentEvent[key] = data.event[key];
          });
          currentEvent.urlHash = window.location.protocol + '//' + window.location.host + '/eventhash/' + currentEvent.hash;
          currentEvent.setSessionEvent();
          if (callback) callback(currentEvent);
        } else {
          // Hopefully this will never happen.
          console.error('Ajax call successful, but event data was incomplete:', data);
          if (callback) callback(currentEvent);
        };
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.warn('Ajax call failed: GET /api/events/' + currentEvent.hash);
        console.log('jqXHR.responseText:',jqXHR.responseText);
        console.log('textStatus:',textStatus);
        console.log('errorThrown:',errorThrown);
        if (callback) callback(currentEvent);
      });
    };
  };

  // This method updates the event record in the database and updates the session information.
  //  Note: it requires an event object with a hash and any updated info.
  EventObject.prototype.updateEventInDB = function(callback) {
    var currentEvent = this;
    $.ajax({
      url: '/api/events/' + currentEvent._id,
      type: 'PUT',
      data: {
        name: currentEvent.name,
        date: currentEvent.date,
        times: currentEvent.times,
        description: currentEvent.description
      },
      cache: false
    })
    .done( function (data) {
      currentEvent.setSessionEvent();
      if (callback) callback(currentEvent);
      return data;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events,', eventInfo);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentEvent);
    });
  };

  EventObject.prototype.setSessionEvent = function() {
    // Store the info in the window session.
    window.sessionStorage.setItem('eventName', this.name);
    window.sessionStorage.setItem('eventHash', this.hash);

    // Also set cookies.
    setCookie('eventName', this.name, 365); // Not interested in expiring cookies at this time.
    setCookie('eventHash', this.hash, 365);
  };

  EventObject.prototype.recoverSessionEvent = function(callback) {
    //console.log('Recovering event info from session.');
    // Recover event info from the window session.
    this.name = window.sessionStorage.getItem('eventName');
    this.hash = window.sessionStorage.getItem('eventHash');

    if (!this.hash) {
      console.log('Event session recover failed. Looking for event info in cookies.');
      // If that doesn't work, try getting session info from cookies.
      this.name = getCookie('eventName');
      this.hash = getCookie('eventHash');
    };

    if (this.hash) {
      this.loadEventFromDB(callback);
    } else {
      callback();
    }
  };

  // Cookie functions adapted from http://www.w3schools.com/js/js_cookies.asp
  var setCookie = function(cookieName, cookieValue, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires + '; path=/';
  };

  var getCookie = function(cookieName) {
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
    return null;
  };

  EventObject.prototype.getRsvpListFromDB = function(callback){
    currentEvent = this;
    $.ajax({
      url: '/api/rsvps/' + currentEvent._id,
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      var rsvpList = data.rsvps.map(function(rsvp){
        return {
          userName:rsvp.user.name,
          status:rsvp.status};
      });
      if (callback) callback(rsvpList);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: GET /api/events/' + currentEvent.hash);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  module.EventObject = EventObject;
}(window));

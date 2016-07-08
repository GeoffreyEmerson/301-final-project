(function(module) {

  function EventObject(){}

  // This method creates a new record in the database and stores the session information.
  EventObject.prototype.saveToDB = function(callback) {
    var currentEvent = this;
    console.log('Saving to DB:',currentEvent.eventName);
    console.assert(currentEvent.eventName, {'message':'Problem with eventName', 'currentEvent.eventName':currentEvent.eventName});
    $.ajax({
      url: '/api/events',
      type: 'POST',
      data: {name: currentEvent.eventName},
      cache: false
    })
    .done( function (data) {
      console.assert(data.event.name && data.event.hash, {'message':'Problem creating event record','data.event.name':data.event.name,'data.event.hash':data.event.hash});
      // After successfully creating a new record for the event, store the info
      currentEvent.eventHash = data.event.hash; // event.hash is created by the API.
      currentEvent.urlHash = window.location.protocol + '//' + window.location.host + '/eventhash/' + currentEvent.eventHash;
      currentEvent.setSessionEvent();
      if (callback) callback(currentEvent);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events,', this.eventName);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentEvent);
    });
  };

  EventObject.prototype.loadEventFromDB = function(callback){
    currentEvent = this;
    if (currentEvent.eventHash) {
      $.ajax({
        url: '/api/events/' + currentEvent.eventHash,
        type: 'GET',
        cache: false
      })
      .done( function (data) {
        console.log('Loaded data from url hash:',data);
        if (data.event.name && data.event.hash) {
          // TODO: Revover ALL data from DB.
          currentEvent.eventName = data.event.name;
          currentEvent.eventHash = data.event.hash;
          currentEvent.urlHash = window.location.protocol + '//' + window.location.host + '/eventhash/' + currentEvent.eventHash;
          currentEvent.setSessionEvent();
          if (callback) callback(currentEvent);
        } else {
          // Hopefully this will never happen.
          console.error('Ajax call successful, but event data was incomplete:', data);
          if (callback) callback(currentEvent);
        };
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.warn('Ajax call failed: GET /api/events/' + eventHash);
        console.log('jqXHR.responseText:',jqXHR.responseText);
        console.log('textStatus:',textStatus);
        console.log('errorThrown:',errorThrown);
        if (callback) callback(currentEvent);
      });
    };
  };

  // This method updates the event record in the database and updates the session information.
  //  Note: it requires an object with the eventHash and any updated info.
  EventObject.prototype.updateEventInDB = function(eventInfo, callback) {
    var currentEvent = this;
    console.assert(eventInfo, {'message':'Problem with eventInfo', 'eventInfo':eventInfo});
    $.ajax({
      url: '/api/events/' + currentEvent.eventHash,
      type: 'PUT',
      data: eventInfo,
      cache: false
    })
    .done( function (data) {
      console.log('Event data updated in DB. Returned data:', data);
      // TODO: Put ALL new data in currentEvent variable.
      if(data.event.eventName) currentEvent.eventName = data.event.eventName;
      if(data.event.urlHash) currentEvent.urlHash = data.event.urlHash;
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
    window.sessionStorage.setItem('eventName', this.eventName);
    window.sessionStorage.setItem('eventHash', this.eventHash);

    // Also set cookies.
    setCookie('eventName', this.eventName, 0); // User cookies are more or less permanent.
    setCookie('eventHash', this.eventHash, 0);
  };

  EventObject.prototype.recoverSessionEvent = function(callback) {
    console.log('Recovering event info from session.');
    // Recover event info from the window session.
    this.eventName = window.sessionStorage.getItem('eventName');
    this.eventHash = window.sessionStorage.getItem('eventHash');

    if (!this.eventName || !this.eventHash) {
      console.log('Session recover failed. Looking for event info in cookies.');
      // If that doesn't work, try getting session info from cookies.
      this.eventName = getCookie('eventName');
      this.eventHash = getCookie('eventHash');
    };

    if (this.eventHash) this.loadEventFromDB(callback);
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

  module.EventObject = EventObject;
}(window));

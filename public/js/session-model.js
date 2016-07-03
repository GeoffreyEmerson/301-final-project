(function(module) {
  // This is the primary method for storing data about the current user session.
  function SessionObject(eventNameArg) {
    this.addEventToDB(eventNameArg);
  }

  // This method creates a new record in the database and stores the session information.
  SessionObject.prototype.addEventToDB = function(eventName, callback) {
    var currentEvent = this;
    $.ajax({
      url: '/api/events',
      type: 'POST',
      data: {name: eventName},
      cache: false
    })
    .done( function (data) {
      // After successfully creating a new record for the event, store the info
      currentEvent.storeEventLocally(data.event.name, data.event.hash);

      // call the callback function here
      if (callback) callback(data);
      return currentEvent;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
    });
  };

  SessionObject.prototype.storeEventLocally = function(eventName, eventHash) {
    // Once we have confirmation that the event has been created in the database,
    //  then put the data in the session object.
    this.eventName = eventName;
    this.eventHash = eventHash;

    // Also store the info in the window session.
    window.sessionStorage.setItem('eventName', eventName);
    window.sessionStorage.setItem('eventHash', eventHash);

    // Also set cookies.
    setCookie('eventName', this.eventName, 10);
    setCookie('eventHash', this.eventHash, 10);
  };

  // Cookie functions adapted from http://www.w3schools.com/js/js_cookies.asp
  setCookie = function(cookieName, cookieValue, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires + '; path=/';
  };

  getCookie = function(cookieName) {
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

  // This method creates a new record in the database and stores the session information.
  //  Note: it requires an object with the eventHash and any updated info.
  SessionObject.updateEventInDB = function(eventInfo, callback) {
    var currentEvent = this;
    $.ajax({
      url: '/api/events/' + currentEvent.eventHash,
      type: 'PUT',
      data: eventInfo,
      cache: false
    })
    .done( function (data) {
      // call the callback function here
      if (callback) callback(data);
      return data;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
    });
  };

  module.SessionObject = SessionObject;
}(window));

// // Example session storage
// // Save data to sessionStorage
// sessionStorage.setItem('key', 'value');
//
// // Get saved data from sessionStorage
// var data = sessionStorage.getItem('key');

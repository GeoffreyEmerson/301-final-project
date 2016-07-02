(function(module) {
  // This is the primary method for storing data about the current user session.
  var Session = {};
  Session.eventName = '';
  Session.eventHash = '';
  Session.userName = '';
  Session.userHash = '';

  // This method creates a new record in the database and stores the session information.
  Session.setEvent = function(eventName, callback) {
    $.ajax({
      url: '/api/events',
      type: 'POST',
      data: {name: eventName},
      cache: false
    })
    .done( function (data) {
      // After successfully creating a new record for the event, store the info
      Session.storeEvent(data.event.name, data.event.hash);

      createTimingTopic(data.event.hash, 'eventStartTopic', 'Click on the calendar to indicate your availability.', callback);
      // call the callback function here
      if (callback) callback(data);
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

  Session.storeEvent = function(eventName, eventHash) {
    Session.eventName = eventName;
    Session.eventHash = eventHash;
    Window.sessionStorage.setItem('eventName', eventName);
    Window.sessionStorage.setItem('eventHash', eventHash);
    Session.setCookie('eventHash', data.event.hash, 10);
    Session.setCookie('eventName', data.event.name, 10);
  };

  // Cookie functions adapted from http://www.w3schools.com/js/js_cookies.asp
  Session.setCookie = function(cookieName, cookieValue, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; ' + expires + '; path=/';
  };

  Session.getCookie = function(cookieName) {
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

  module.Session = Session;
}(window));

// Example session storage
// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
var data = sessionStorage.getItem('key');

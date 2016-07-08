(function(module) {
  function UserObject() {

  }

  // New user objects created here and saved to DB
  UserObject.prototype.createUser = function(userName, callback){
    var currentUser = this;
    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: {name: userName},
      cache: false
    })
    .done( function (data) {
      currentUser.userName = data.user.name;
      currentUser.userHash = data.user.hash;
      currentUser.setSessionUser();
      if (callback) callback(currentUser);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/users,',userName);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentUser);
    });
  };

  UserObject.prototype.rsvpTrigger = function(callback) {
    $.ajax({
      url: '/api/rsvps',
      type: 'POST',
      data: {eventHash: Event.eventHash, userHash: this.userHash},
      cache: false
    })
    .done(function(data) {
      if (callback) callback(data.rsvp.status);
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

  UserObject.prototype.getRsvpFromDB = function(callback){
    console.assert(this.userHash, {'message':'Problem with userHash', 'this.userHash':this.userHash});
    console.assert(Event.eventHash, {'message':'Problem with eventHash', 'Event':Event});
    var userHash = this.userHash;
    var eventHash = Event.eventHash;
    $.ajax({
      url: '/api/rsvps/' + eventHash + '/' + userHash,
      type: 'GET',
      cache: false
    })
    .done(function(data) {
      if (callback) callback(data.status);
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

  UserObject.prototype.setSessionUser = function() {
    // Store the info in the window session.
    window.sessionStorage.setItem('userName', this.userName);
    window.sessionStorage.setItem('userHash', this.userHash);

    // Also set cookies.
    setCookie('userName', this.userName, 0); // User cookies are more or less permanent.
    setCookie('userHash', this.userHash, 0);
  };

  UserObject.prototype.recoverSessionUser = function(callback) {
    console.log('Recovering user info from session.');

    // Recover user info from the window session.
    this.userName = window.sessionStorage.getItem('userName');
    this.userHash = window.sessionStorage.getItem('userHash');

    if (!this.userName || !this.userHash) {
      console.log('Session recover failed. Looking for user info in cookies.');
      // If that doesn't work, try getting session info from cookies.
      this.userName = getCookie('userName');
      this.userHash = getCookie('userHash');
    };

    if (callback) callback();
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

  module.UserObject = UserObject;
}(window));

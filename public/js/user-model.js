(function(module) {
  function UserObject() {}

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
      console.log('New user data:',data);
      Object.keys(data.user).forEach(function(key){
        currentUser[key] = data.user[key];
      });
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

  UserObject.prototype.lookup = function(userId,callback) {
    $.ajax({
      url: '/api/users/' + userId,
      type: 'GET',
      cache: false
    })
    .done(function(data) {
      console.log('User.lookup successful:',data);
      if (callback) callback(data.user.name);
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

  UserObject.prototype.rsvpTrigger = function(callback) {
    console.assert(Event._id && this._id, {'message':'Problem with rsvpTrigger','Event._id':Event._id,'this._id':this._id});
    $.ajax({
      url: '/api/rsvps',
      type: 'POST',
      data: {eventId: Event._id, userId: this._id},
      cache: false
    })
    .done(function(data) {
      console.log('rsvpTrigger ajax success:', data);
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
    console.assert(this._id, {'message':'Problem with this._id', 'this':this});
    console.assert(Event._id, {'message':'Problem with Event._id', 'Event':Event});
    var userId = this._id;
    var eventId = Event._id;
    $.ajax({
      url: '/api/rsvps/' + eventId + '/' + userId,
      type: 'GET',
      cache: false
    })
    .done(function(data) {
      if (callback) callback(data.status);
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
    window.sessionStorage.setItem('userName', this.name);
    window.sessionStorage.setItem('userId', this._id);

    // Also set cookies.
    setCookie('userName', this.name, 365);
    setCookie('userId', this._id, 365);
  };

  UserObject.prototype.recoverSessionUser = function(callback) {
    //console.log('Recovering user info from session.');

    // Recover user info from the window session.
    this.name = window.sessionStorage.getItem('userName');
    this._id = window.sessionStorage.getItem('userId');

    if (!this.name || !this._id) {
      console.log('Session recover failed. Looking for user info in cookies.');
      // If that doesn't work, try getting session info from cookies.
      this.name = getCookie('userName');
      this._id = getCookie('userId');
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

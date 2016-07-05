(function(module) {
  // This is the primary method for storing data about the current user session.
  function SessionObject() {}

  SessionObject.prototype.setSessionEvent = function(eventName, eventHash) {
    if (eventName) this.eventName = eventName;
    if (eventHash) this.eventHash = eventHash;

    // These will definitely be needed.
    // Store event info in the window session.
    window.sessionStorage.setItem('eventName', this.eventName);
    window.sessionStorage.setItem('eventHash', this.eventHash);

    // Also set cookies.
    setCookie('eventName', this.eventName, 10);
    setCookie('eventHash', this.eventHash, 10);
  };

  SessionObject.prototype.recoverSessionEvent = function() {
    // Recover event info from the window session.
    this.eventName = window.sessionStorage.getItem('eventName');
    this.eventHash = window.sessionStorage.getItem('eventHash');

    if (!this.eventName || !this.eventHash) {
      // If that doesn't work, try getting session info from cookies.
      this.eventName = getCookie('eventName');
      this.eventHash = getCookie('eventHash');
    };
  };

  SessionObject.prototype.setSessionUser = function(userName, userHash) {
    if (userName) this.userName = userName;
    if (userHash) this.userHash = userHash;

    // Also store the info in the window session.
    window.sessionStorage.setItem('userName', this.userName);
    window.sessionStorage.setItem('userHash', this.userHash);

    // Also set cookies.
    setCookie('userName', this.userName, 0); // User cookies are more or less permanent.
    setCookie('userHash', this.userHash, 0);
  };

  SessionObject.prototype.recoverSessionUser = function() {
    // Recover session user info from the window session.
    this.userName = window.sessionStorage.getItem('userName');
    this.userHash = window.sessionStorage.getItem('userHash');

    if (!this.userName || !this.userHash) {
      // If that doesn't work, try getting session info from cookies.
      this.userName = getCookie('userName');
      this.userHash = getCookie('userHash');
    };
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

  module.SessionObject = SessionObject;
}(window));

// // Example session storage
// // Save data to sessionStorage
// sessionStorage.setItem('key', 'value');
//
// // Get saved data from sessionStorage
// var data = sessionStorage.getItem('key');

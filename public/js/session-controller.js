(function(module) {
  // This object will store current Event and current User reference info for the session.
  var Session = new SessionObject();

  Session.updateEvent = function(eventName, eventHash){
    this.eventName = eventName;
    this.eventHash = eventHash;

    this.setSessionEvent(); // Save changes to window session and cookies
  };

  Session.getEventHash = function(){
    //TODO: Make this method more robust in case of error
    return this.eventHash;
  };

  Session.getEventName = function(){
    //TODO: Make this method more robust in case of error
    return this.eventName;
  };

  Session.setUser = function(userName, userHash){
    this.userName = userName;
    this.userHash = userHash;

    this.setSessionUser(); // Save changes to window session and cookies
  };

  Session.getUserName = function(){
    //TODO: Make this method more robust in case of error
    return this.userName;
  };

  Session.getUserHash = function(){
    //TODO: Make this method more robust in case of error
    return this.userHash;
  };

  module.Session = Session;
}(window));

(function(module) {
  // TODO: Consider moving all of this functionality to the Event and User objects
  var Session = new SessionObject();

  Session.updateEvent = function(eventName, eventHash){
    console.assert(eventName && eventHash, {'message':'Problem updating event record','eventName':eventName,'eventHash':eventHash});

    this.eventName = eventName;
    this.eventHash = eventHash;

    this.setSessionEvent(); // Save changes to window session and cookies
  };

  Session.getEventHash = function(){
    if (this.eventHash) {
      // If all is good, let the callback chain proceed
      return this.eventHash;
    } else {
      // If not, look for data in storage and cookies before continuing.
      Session.recoverSession();
      return this.eventHash;
    }
  };

  Session.getEventName = function(callback){
    //TODO: Make this method more robust in case of error
    return this.eventName;
  };

  Session.setUser = function(userName, userHash){
    this.userName = userName;
    this.userHash = userHash;

    this.setSessionUser(); // Save changes to window session and cookies
  };

  Session.getUserName = function(callback){
    //TODO: Make this method more robust in case of error
    return this.userName;
  };

  Session.getUserHash = function(callback){
    //TODO: Make this method more robust in case of error
    return this.userHash;
  };

  module.Session = Session;
}(window));

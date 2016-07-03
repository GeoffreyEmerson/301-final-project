(function(module) {
  var Session = {};

  Session.newEvent = function(eventName, callback) {
    Session = new SessionObject(eventName);
    EventController.createTimingTopic(Session.eventHash, 'eventStartTopic', 'Click on the calendar to indicate your availability.', callback);
  };

  Session.getEventHash = function(){
    //TODO: Make this method more robust in case of error
    return SessionObject.eventHash;
  };

  Session.getEventName = function(){
    //TODO: Make this method more robust in case of error
    return SessionObject.eventName;
  };

  Session.getUserHash = function(){
    //TODO: Make this method more robust in case of error
    return SessionObject.userHash;
  };

  Session.getUserName = function(){
    //TODO: Make this method more robust in case of error
    return SessionObject.userName;
  };

  module.Session = Session;
}(window));

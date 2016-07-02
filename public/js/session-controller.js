(function(module) {

  SessionController.setEvent = function(eventName, callback) {
    Session.setEvent(eventName, callback);
  };

  module.SessionController = SessionController;
}(window));

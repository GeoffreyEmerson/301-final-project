(function(module) {
  var User = new UserObject();

  User.newUser = function(userName, callback) {
    this.createUser(userName, function(result){
      // After successfully creating a new record for the event, store the info
      User = result;
      //Session.setUser(User.userName, User.userHash); // Moving away from session object pattern
      if (callback) callback();
    });
  };

  User.getUserName = function(callback){
    this.recoverSessionUser(callback);
  };

  User.updateRsvp = function(callback) {
    User.rsvpTrigger(function(result){
      if (callback) callback(result);
    });
  };

  User.getRsvpStatus = function(callback){
    if (!this.rsvp) {
      this.getRsvpFromDB(callback);
    } else {
      callback(this.rsvp);
    }
  };

  module.User = User;
}(window));
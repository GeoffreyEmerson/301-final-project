(function(module) {
  var User = new UserObject();

  User.newUser = function(userName, callback) {
    this.createUser(userName, function(result){
      User = result;
      // console.log('New user created: ' + User.userName);
      if (callback) callback();
    });
  };

  User.recoverUserNamefromSession = function(callback){
    this.recoverSessionUser(callback);
  };

  User.getNameFromId = function(userId,callback) {
    console.log('In method User.getNameFromId, "this" is:',this);
    if (this._id === userId) return this.name;
    User.lookup(userId, function(result){
      return result;
    });
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

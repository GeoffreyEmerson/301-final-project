(function(module) {
  var UserController = {};

  UserController.newUser = function(userName, callback) {
    UserController = new UserObject(userName, function(data){
      // After successfully creating a new record for the event, store the info
      Session.setUser(data.user.name, data.user.hash);
      if (callback) callback();
    });

  };

  module.UserController = UserController;
}(window));

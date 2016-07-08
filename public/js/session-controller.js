(function(module) {
  var Session = {};

  Session.check = function(ctx, next) {
    if (!Event.eventName) {
      Event.recoverSessionEvent(function(){
        if (!Event.eventName) {
          console.log('No event found. Diverting to create event view.');
          page.show('/new');
        } else {
          console.log('Event found: ' + Event.eventName);
          checkForUser(next);
        }
      });
    } else {
      console.log('Event found: ' + Event.eventName);
      checkForUser(next);
    }
  };

  function checkForUser(next) {
    if (!User.userName) {
      User.getUserName(function(){
        if (!User.userName) {
          console.log('No user name found. Diverting to name view.');
          page.show('name');
        } else {
          console.log('User found: ' + User.userName);
          next();
        }
      });
    } else {
      console.log('User found: ' + User.userName);
      next();
    }
  }

  module.Session = Session;
}(window));

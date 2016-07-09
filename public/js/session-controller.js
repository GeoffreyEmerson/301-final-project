(function(module) {
  var Session = {};

  Session.check = function(ctx, next) {
    if (!Event.name) {
      Event.recoverSessionEvent(function(){
        if (!Event.name) {
          console.log('No event found. Diverting to create event view.');
          page.show('/new');
        } else {
          // console.log('Event found: ' + Event.name);
          checkForUser(next);
        }
      });
    } else {
      // console.log('Event found: ' + Event.name);
      checkForUser(next);
    }
  };

  function checkForUser(next) {
    if (!User.name) {
      User.recoverUserNamefromSession(function(){
        if (!User.name) {
          console.log('No user name found. Diverting to name view.');
          page.show('name');
        } else {
          // console.log('User found: ' + User.userName);
          next();
        }
      });
    } else {
      // console.log('User found: ' + User.userName);
      next();
    }
  }

  module.Session = Session;
}(window));

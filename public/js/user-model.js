(function(module) {
  function UserObject() {

  }

  // New user objects created here and saved to DB
  UserObject.prototype.createUser = function(userName, callback){
    var currentUser = this;
    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: {name: userName},
      cache: false
    })
    .done( function (data) {
      currentUser.userName = data.user.name;
      currentUser.userHash = data.user.hash;
      if (callback) callback(currentUser);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/users,',userName);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentUser);
    });
  };

  UserObject.prototype.rsvpTrigger = function(callback) {
    $.ajax({
      url: '/api/rsvps',
      type: 'POST',
      data: {eventHash: Event.eventHash, userHash: this.userHash},
      cache: false
    })
    .done(function(data) {
      if (callback) callback(data.rsvp.status);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
    });
  };

  UserObject.prototype.getRsvpFromDB = function(callback){
    console.assert(this.userHash, {'message':'Problem with userHash', 'this.userHash':this.userHash});
    console.assert(Event.eventHash, {'message':'Problem with eventHash', 'Event':Event});
    var userHash = this.userHash;
    var eventHash = Event.eventHash;
    $.ajax({
      url: '/api/rsvps/' + eventHash + '/' + userHash,
      type: 'GET',
      cache: false
    })
    .done(function(data) {
      if (callback) callback(data);
      return data;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
    });
  };

  module.UserObject = UserObject;
}(window));

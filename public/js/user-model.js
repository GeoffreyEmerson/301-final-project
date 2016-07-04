(function(module) {
  function UserObject(userName, callback) {
    return this.newUser(userName, callback);
  }

  // New user objects created here and saved to DB
  UserObject.prototype.newUser = function(userName, callback){
    var currentUser = this;
    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: {name: userName},
      cache: false
    })
    .done( function (data) {
      console.log('Creating new user. Returned data:',data);
      currentUser.userName = data.user.name;
      currentUser.userHash = data.user.hash;
      if (callback) callback(data);
      return currentUser;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/users,',userName);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  module.UserObject = UserObject;
}(window));

(function(module) {

  var HomeView = {};

  var $tatus = $('#status');

  HomeView.initHomeView = function (ctx, next) {
    console.log('initHomeView called');
    var eventHash = Event.eventHash;
    var eventName = Event.eventName;
    console.assert(eventHash && eventName, {'message':'eventHash and/or eventName problem in home-view.js','eventHash':eventHash,'eventName':eventName});
    var userHash = User.userHash;
    var userName = User.userName;
    console.assert(userHash && userName, {'message':'userHash and/or userName problem in home-view.js','userHash':userHash,'userName':userName});

    // Display the event name and user name.
    $('#event-name').text(eventName);
    $('#user-id h4').text(userName);

    // Set up the Rsvp status button colors for the current user
    User.getRsvpStatus(function(rsvpStatus){
      if (rsvpStatus == 1) {
        $tatus.removeClass('blank');
        $tatus.addClass('maybe');
      } else if (rsvpStatus == 2) {
        $tatus.removeClass('blank');
        $tatus.addClass('approve');
      } else if(rsvpStatus == -1) {
        $tatus.removeClass('blank');
        $tatus.addClass('approve');}
    });
  };

  HomeView.updateButton = function () {
    if ($tatus.hasClass('blank')) { //If blank -> maybe
      $tatus.toggleClass('blank maybe');
      $tatus.children().text('Maybe');
      $('#status-instructions').remove();
      //Send state to backend
    } else if ($tatus.hasClass('maybe')) { //If maybe -> going
      $tatus.toggleClass('maybe approve');
      $tatus.children().text('Yep');
      //Send state to backend
    } else if ($tatus.hasClass('approve')) { //if going -> not going
      $tatus.toggleClass('approve disapprove');
      $tatus.children().text('Nope');
      //Send state to backend
    } else if ($tatus.hasClass('disapprove')) { //if not going -> blank
      $tatus.toggleClass('disapprove blank');
      $tatus.children().text('Going?');
      //Send state to backend
    }
  };

  //Cycle through a collection of states.
  $tatus.on('click', function() {
    User.updateRsvp(function(result) {
      HomeView.updateButton(result);
      console.log('Rsvp status is now: ' + result);
    });
  });

  module.HomeView = HomeView;
})(window);

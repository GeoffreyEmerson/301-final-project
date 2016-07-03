(function(module) {

  var HomeView = {};

  var $tatus = $('#status');

  HomeView.initHomeView = function (ctx, next) {
    console.log('initHomeView called');
    var eventHash = Session.getEventHash();
    var eventName = Session.getEventName();
    console.assert(eventHash && eventName, {'message':'eventHash and/or eventName problem in home-view.js','eventHash':eventHash,'eventName':eventName});
    var userHash = Session.getUserHash();
    var userName = Session.getUserName();
    console.assert(userHash && userName, {'message':'userHash and/or userName problem in home-view.js','userHash':userHash,'userName':userName});

    // Set up event view with the event name and user name.
    $('#event-name').text(eventName);
    $('#user-id h4').text(userName);

    // Set up the Rsvp status button colors for the current user
    HomeModel.getRsvp(userHash,eventHash, function(data){
      if (data.status == 1) {
        $tatus.removeClass('blank');
        $tatus.addClass('maybe');
      } else if (data.status == 2) {
        $tatus.removeClass('blank');
        $tatus.addClass('approve');
      } else if(data.status == -1) {
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

  $tatus.on('click', function() {
    HomeController.updateRsvp(Session.getEventHash(),Session.getUserHash());
    //Cycle through a collection of states.
    HomeView.updateButton();
  });

  module.HomeView = HomeView;
})(window);

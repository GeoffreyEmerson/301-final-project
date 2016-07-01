(function(module) {
  var HomeView = {};
  var $tatus = $('#status');
  HomeView.initHomeView = function (next) {
    console.log('HomeView.initHomeView called');
    $('#event-name').text('Boop'); //TODO: Get this to be defined. Appears to be stalled out because of asynch problems.
    $('#user-id h4').text('Beep'); //TODO: get this to be defined. Appears to be stalled out because of asynch problems.
    console.log($('#user-id').data());
    console.log($('#event').data());
    if (next) next();
  };

  $tatus.on('click', function() {
    console.log('ping');
    //Cycle through a collection of states.
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
  });
  module.HomeView = HomeView;
})(window);

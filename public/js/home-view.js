(function(module) {
  var HomeView = {};
  var $tatus = $('#status');
  HomeView.initHomeView = function (next) {
    console.log('initHomeView called');
    $('#event-name').text($('#event').data('eventname')); //TODO: Get this to be defined. Appears to be stalled out because of asynch problems.
    $('#user-id h4').text($('#user-id').data('username')); //TODO: get this to be defined. Appears to be stalled out because of asynch problems.
    console.log($('#user-id').data());
    console.log($('#event').data());
    // if (next) next();
  };

  $tatus.on('click', function() {
    //Send data to backend:
    HomeController.updateAttendance($('#event').data('eventhash'),$('#user-id').data('userhash'));
    //Cycle through a collection of states.
    if ($tatus.hasClass('blank')) { //If blank -> maybe
      $tatus.toggleClass('blank maybe');
      $tatus.children().text('Maybe');
      $('#status-instructions').remove();
    } else if ($tatus.hasClass('maybe')) { //If maybe -> going
      $tatus.toggleClass('maybe approve');
      $tatus.children().text('Yep');
    } else if ($tatus.hasClass('approve')) { //if going -> not going
      $tatus.toggleClass('approve disapprove');
      $tatus.children().text('Nope');
    } else if ($tatus.hasClass('disapprove')) { //if not going -> blank
      $tatus.toggleClass('disapprove blank');
      $tatus.children().text('Going?');
    }
  });
  module.HomeView = HomeView;
})(window);

(function(module) {

  var HomeController = {};

  HomeController.updateRsvp = function(eventHashArg, userHashArg, callback) {
    $.ajax({
      url: '/api/rsvps',
      type: 'POST',
      data: {eventHash: eventHashArg, userHash: userHashArg},
      cache: false
    })
    .done(function(data) {
      console.log('Sent ' + eventHashArg + ' and ' + userHashArg);
      if (callback) callback(data);
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

  module.HomeController = HomeController;
})(window);

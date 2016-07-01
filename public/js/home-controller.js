(function(module) {
  var HomeController = {};
  //Your code goes below here. Remember to declare functions [objectName].[functionName] = function () {...}
  HomeController.updateAttendance = function(eventHashArg, userHashArg) {
    $.ajax({
      url: '/api/rsvps',
      type: 'POST',
      data: {eventHash: eventHashArg, userHash: userHashArg},
      cache: false
    })
    .done(function() {
      console.log('Sent ' + eventHashArg + ' and ' + userHashArg);
    });
  };
  module.HomeController = HomeController;
})(window);

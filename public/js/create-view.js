(function(module){
  var CreateView = {};

  CreateView.init = function(callback) {
    // Hide everything but the create view
    $('.nav-main').hide();
    $('.page').hide();
    $('#homepage').fadeIn();

    // Set up the listener for the "New Event" button
    $('#create-event').on('submit', function(event) {
      event.preventDefault();
      var eventValue = $('#event-value').val();
      Session.newEvent(eventValue, function() {
        // TODO: Handle bad return value
        if (callback) callback();
        page.show('name');
      });
    });
  };

  module.CreateView = CreateView;
}(window));

(function(module){
  var CreateView = {};

  CreateView.init = function(callback) {
    // Hide everything but the create view
    $('.nav-main').hide();
    $('.page').hide();
    $('#homepage').fadeIn();

    // Set up the listener for the "New Event" button
    $('#create-event').off(); //Because of the SPA, remove already applied listener.
    $('#create-event').on('submit', function(event) {
      event.preventDefault();
      var eventValue = $('#event-value').val();
      Event.newEvent(eventValue, function(data) {
        // TODO: Handle bad return value
        TopicController.createTopic(
          Event.eventHash,
          'eventStartTopic',
          'Click on the calendar to indicate your availability.'
        );
        page.show('name');
      });
    });
    //if (callback) callback(); // This is the only terminal route callback that doesn't trigger a page reload!
  };

  module.CreateView = CreateView;
}(window));

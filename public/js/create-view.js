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
      var eventName = $('#event-value').val();
      Event.newEvent(eventName, function(newEvent) {
        // TODO: Handle bad return value
        TopicController.createTopic(
          newEvent._id,
          'eventStartTopic',
          'Click on the calendar to indicate your availability.'
        );
        page.show('name');
      });
    });
    // if (callback) callback(); // Causes a page reload.
  };

  module.CreateView = CreateView;
}(window));

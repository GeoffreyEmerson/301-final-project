(function(module) {

  var EventView = {};

  // TODO: Do we need seperate inits for the view and controller?
  EventView.initEventView = function (ctx, next) {
    console.log('EventView.initEventView called!');

    // Generate shareable link
    $('#share-url').val(
      window.location.protocol +
      '//' + window.location.host +
      '/eventhash/' +
      EventController.getCookie('eventHash')
    );
    $('#share-url').on('focus', function(){
      this.select();
    });

    if (next) next();
  };

  module.EventView = EventView;
})(window);

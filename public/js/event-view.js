(function(module) {
  var EventView = {};

  EventView.initEventView = function (ctx, next) {
    console.log('EventView.initEventView called!');
    $('#share-url').val(window.location.protocol + '//' + window.location.host + '/eventhash/' + EventController.getCookie('eventHash'));
    $('#share-url').on('focus', function(){
      this.select();
    });
    if (next) next();
  };
  module.EventView = EventView;
})(window);

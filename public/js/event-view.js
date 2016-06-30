(function(module) {

  var EventView = {};

  EventView.initEventView = function () {
    $('#share-url').val(EventController.getCookie('eventHash'));
    $('#share-url').on('focus', function(){
      this.select();
    });
  };
  module.EventView = EventView;
})(window);

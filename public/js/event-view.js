(function(module) {

  var EventView = {};

  EventView.initEventView = function () {
    $('#share-url').val(window.location.protocol + '//' + window.location.host + '/eventhash/' + EventController.getCookie('eventHash'));
    $('#share-url').on('focus', function(){
      this.select();
    });
  };
  module.EventView = EventView;
})(window);

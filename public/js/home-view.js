(function(module) {
  var homeView = {};
  homeView.initHomeView = function () {
    $('#event-name').text($('#event').data(eventName));
  };
  module.homeView = homeView;
})(window);

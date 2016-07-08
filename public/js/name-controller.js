(function(module){
  var NameController = {};

  NameController.init = function(ctx, callback) {
    NameView.init(callback);
  };

  module.NameController = NameController;
})(window);

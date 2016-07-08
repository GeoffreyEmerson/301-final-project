(function(module) {

  var CreateController = {};

  CreateController.init = function(ctx, callback){
    CreateView.init(callback);
  };

  module.CreateController = CreateController;
}(window));

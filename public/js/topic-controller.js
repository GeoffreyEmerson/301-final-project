(function(module) {
  topicController = {};
  topicController.wordMe = function(wordName, userHash, topicHash) {
    var newWd = new Word(wordName, userHash, topicHash);
    console.log(newWd);
    wordArr.push(newWd);
    topicView.clouderator(wordArr);
    topicView.reclouderator();
    console.log('end topicController.wordMe');
  };
  // topicController.wordMe('gypsum', 'lksaf9pwurp2o', 'we09r20lksjdf');
  // topicController.wordMe('anchovies', 'lksaf9pwurp2o', 'we09r20lksjdf');
  // topicController.wordMe('ferroconcrete', 'lksaf9pwurp2o', 'we09r20lksjdf');
  // topicController.wordMe('peppers', 'lksaf9pwurp2o', 'we09r20lksjdf');

  //NOTE: In sand box context topicController.wordMe fails to invoke jQcloud properly when called by this handler more than once; calling topicController.wordMe directly from code works fine as per above; problem may not persist once pulling wordArr from storage.
  topicController.newOpt = function() {
    $('#creator').on('click', function() {
      console.log('newOpt start');
      var text = $('#wdText').val();
      var uHash = $('#userHash').val();
      var tHash = $('#topicHash').val();
      topicController.wordMe(text, uHash, tHash);
      console.log('newOpt complete');
    });
  };
  topicController.newOpt(); //TODO: I suspect this needs to be invoked differently?
  module.topicController = topicController;
})(window);

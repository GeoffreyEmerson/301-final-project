(function(module) {

  var TopicView = {};

//SET UP WORD CLOUD REAL ESTATE IN CLUSTER VIEW
  TopicView.topicCloudInit = function(div) {
    console.log('Initiating jQCloud');
    cloudDiv = $('#' + div);
    // console.log(cloudDiv);
    cloudDiv.jQCloud([], {
      width: 500,
      height: 350
    });
  };

  module.TopicView = TopicView;

})(window);

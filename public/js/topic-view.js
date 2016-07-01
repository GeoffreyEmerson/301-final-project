(function(module) {

  var TopicView = {};

//SET UP WORD CLOUD REAL ESTATE IN CLUSTER VIEW
  TopicView.topicCloudInit = function() {
    console.log('Initiating jQCloud');
    $('#cloud').jQCloud([], {
      width: 500,
      height: 350
    });
  };

  //POPULATE WORD CLOUD WITH ITEMS PUSHED TO wordArr BY AGGREGATOR (CURRENTLY BY CONSTRUCTOR)
  // TopicView.clouderator = function() {
  //   // $('#cloud').empty();
  //   $('#cloud').jQCloud(wordArr, {
  //     width: 500,
  //     height: 350
  //   });
  //   console.log('clouderator complete');
  // };

  // TopicView.reclouderator = function() {
  //   // $('#cloud').empty();
  //   $('#cloud').jQCloud('update', wordArr);
  //   console.log('reclouderated');
  // }

  // //CLICK HANDLER TO SET VOTE STATE OF CLOUD VIEW ITEMS FOR EXPORT BACK TO WD. OBJ.
  // TopicView.initCloudItemClickHandler = function() {
  //   $('#cloud').on('click', 'span', function(ctx) {
  //     var userHash = this.getAttribute('data-usid');
  //     var topicId = this.getAttribute('data-topicid');
  //     var optionClickText = $(this).text();
  //
  //     console.log('Click detected!');
  //     console.log('userHash:',userHash);
  //     console.log('topicId:',topicId);
  //     console.log('optionClickText:',optionClickText);
  //
  //     // DONE: Change this method to an ajax call on the back end.
  //     sendClickEvent(text,userHash,topicId, callback); //callback function needs to be what redraws the topic cloud.

      //user vote-state logic:

      // var $vState = $(this).attr('data-votestate');
      // if ($vState < 2) {
      //   $vState ++;
      //   this.setAttribute('data-votestate', $vState);
      // } else if ($vState == 2) {
      //   $vState = $vState - 3;
      //   this.setAttribute('data-votestate', $vState);
      // }

      // console.log($vState);
      // console.log(this.getAttribute('data-votestate'));
  //   });
  // };

  // var sendClickEvent = function(text,userHash,topicId, callback) {
    // AJAX call to update the db and perform vote change logic
  //}

  //DONE: figure out where to run initCloudItemClickHandler();

  module.TopicView = TopicView;

})(window);

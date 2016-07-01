(function(module) {

  TopicController = {};

  var wordArr = [];

  // TopicController.wordMe = function(wordName, userHash, topicHash) {
  //   var newWd = new Word(wordName, userHash, topicHash);
  //   console.log(newWd);
  //   wordArr.push(newWd);
  //   topicView.clouderator(wordArr);
  //   topicView.reclouderator();
  //   console.log('end topicController.wordMe');
  // };
  // topicController.wordMe('gypsum', 'lksaf9pwurp2o', 'we09r20lksjdf');
  // topicController.wordMe('anchovies', 'lksaf9pwurp2o', 'we09r20lksjdf');
  // topicController.wordMe('ferroconcrete', 'lksaf9pwurp2o', 'we09r20lksjdf');
  // topicController.wordMe('peppers', 'lksaf9pwurp2o', 'we09r20lksjdf');

  // TopicController.topicCloudInit = function()
  //   console.log('Initiating jQCloud');
  //   $('#cloud').jQCloud([], {
  //     width: 500,
  //     height: 350
  //   });
    //@topic-view.js:56, Hey!  Maybe this is the place!
    //CLICK HANDLER TO SET VOTE STATE OF CLOUD VIEW ITEMS FOR EXPORT BACK TO WD. OBJ.
    // DONE: Change this method to an ajax call on the back end.
  TopicController.initCloudItemClickHandler = function() {
    $('#cloud').on('click', 'span', function(ctx) {
      console.log('Click detected! Initiating word cloud click handler');
      var text = $(this).text();
      console.log('optionClickText:',text);
      var uHash = this.getAttribute('data-usid');
      console.log('userHash:',uHash);
      var tHash = this.getAttribute('data-topicid');
      console.log('topicId:',tHash);
      TopicController.wordClick(text, uHash, tHash);

      // sendClickEvent(text,userHash,topicId, callback); //callback function needs to be what redraws the topic cloud.
    });

    $('#creator').on('click', function() {
      console.log('new word created');
      var text = $('#wdText').val();
      var uHash = $('#userHash').val();
      var tHash = $('#topicHash').val();
      TopicController.wordClick(text, uHash, tHash);
      console.log('end of word cloud initiation');
    });
  };

  TopicController.wordClick = function(text, userHashArg, topicIdArg, callback) {
    $.ajax({
      url: '/api/votes',
      type: 'POST',
      data: {name: text, userHash: userHashArg, topicId: topicIdArg},
      cache: false
    })
      .done( function (data) {
        // call the callback function here
        $.ajax({
          url: '/api/votes',
          type: 'GET',
          data: {name: text, userHash: userHashArg, topicId: topicIdArg},
          cache: false
        });
        console.log('Successful ajax call:');
        console.log(data);
        wordInsert = [{
          text: data.vote.name,
          weight: data.vote.weight,
          html: {
            'data-usid': data.vote.userHash,
            'data-topicid': data.vote.topicId,
            'data-votestate': 0,
            'class' : 'noSelect'
          }
        }];
        wordArr.push(wordInsert);
// data will return an array of word objects like this: {text:"lorem",weight:5,voteState:-1};
        $('#cloud').jQCloud('update', wordArr);
        // update voteStates
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.log('Failed to send click to database.');
        // call the error version of the callback if any
      });
  };


  // DONE: find the right place to run topicCloudInit();
  // topicController.newOpt = function() {
  //   $('#creator').on('click', function() {
  //     console.log('newOpt start');
  //     var text = $('#wdText').val();
  //     var uHash = $('#userHash').val();
  //     var tHash = $('#topicHash').val();
  //     topicController.wordMe(text, uHash, tHash);
  //     console.log('newOpt complete');
  //   });
  // };

  module.TopicController = TopicController;

})(window);

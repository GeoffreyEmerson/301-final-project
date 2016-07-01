(function(module) {

  TopicController = {};

  var wordArr = [];

  // Example of needed format for each word object
  // {
  //   text: 'BBQ',
  //   weight: 1,
  //   html: {
  //     'data-usid': '8280592847bfc49f7f29d5015889caa7bec15024',
  //     'data-topicid': 'we09r20lksjdf',
  //     'data-votestate': 1,
  //     'class' : 'noSelect'
  //   }
  // }

  // Populate wordArr from database
  //var

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

  //NOTE: In sand box context wordMe fails to invoke jQcloud properly when called by this handler more than once; calling wordMe directly from code works fine as per above; problem may not persist once pulling wordArr from storage.
  // topicController.topicCloudInit = function(div) {
  //   console.log('Initiating jQCloud');
  //   cloudDiv = $('#' + div);
  //   // console.log(cloudDiv);
  //   cloudDiv.jQCloud([], {
  //     width: 500,
  //     height: 350
  //   });

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
      var uHash = $('#user-id').data('userhash');
      var tHash = $('#topicHash').val();
      TopicController.wordClick(text, uHash, tHash);
      console.log('end of word cloud initiation');
    });
  };

  TopicController.wordClick = function(text, userHashArg, topicIdArg, callback) {
    console.log('We are voting on an option!');
    console.log(text, userHashArg, topicIdArg, callback);
    $.ajax({
      url: '/api/votes',
      type: 'POST',
      data: {name: text, userHash: userHashArg, topicId: topicIdArg},
      cache: false
    })
      .done( function (data) {
        console.log('Successful ajax call:');
        console.log(data);
        $.ajax({
          url: '/api/votes',
          type: 'GET',
          cache: false
        })
        .done(function(result){
          console.log('full query result:',result);
          // calculate aggregate weight
          var filteredVotes = result.votes.filter(function(vote){
            if (vote.topicId == topicIdArg && vote.name == text) return true;
          });
          console.log('filtered query result:',filteredVotes);
          var aggregatedWeight = filteredVotes.reduce(function(prev,cur){
            return prev + cur.weight;
          },0);
          console.log('The new aggregated weight is',aggregatedWeight);

          wordInsert = {
            text: data.vote.name,
            weight: aggregatedWeight,
            html: {
              'data-usid': data.vote.userHash,
              'data-topicid': data.vote.topicId,
              'data-votestate': data.vote.weight,
              'class' : 'noSelect'
            }
          };
          console.log('New wordInsert:',wordInsert);

          console.log('Pre-mapped wordArr:',wordArr);
          var found = false;
          wordArr = wordArr.map(function(wordObj){
            if(wordObj.text == wordInsert.text) {
              found = true;
              return wordInsert;
            }
            return wordObj;
          });

          if (!found) wordArr.push(wordInsert);

          console.log('New word array is',wordArr);
          // data will return an array of word objects like this: {text:"lorem",weight:5,voteState:-1};
          $('#cloud').jQCloud('update', wordArr);
          // update voteStates
        });
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.log('Failed to send click to database.');
        // call the error version of the callback if any
      });
  };

  //NOTE: In sand box context topicController.wordMe fails to invoke jQcloud properly when called by this handler more than once; calling topicController.wordMe directly from code works fine as per above; problem may not persist once pulling wordArr from storage.
  // topicController.newOpt = function() {$('#creator').on('click', function() {
  //   console.log('newOpt start');
  //   var text = $('#wdText').val();
  //   var uHash = $('#userHash').val();
  //   var tHash = $('#topicHash').val();
  //   topicController.wordMe(text, uHash, tHash);
  //   console.log('newOpt complete');
  // });
  //};

  //topicController.newOpt(); //TODO: I suspect this needs to be invoked differently?
  module.TopicController = TopicController;

})(window);

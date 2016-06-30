function wordMe(wordName, userHash, topicHash) {
  var newWd = new Word(wordName, userHash, topicHash);
  console.log(newWd);
  wordArr.push(newWd);
  clouderator(wordArr);
  reclouderator();
  console.log('end wordMe');
};
// wordMe('gypsum', 'lksaf9pwurp2o', 'we09r20lksjdf');
// wordMe('anchovies', 'lksaf9pwurp2o', 'we09r20lksjdf');
// wordMe('ferroconcrete', 'lksaf9pwurp2o', 'we09r20lksjdf');
// wordMe('peppers', 'lksaf9pwurp2o', 'we09r20lksjdf');

//NOTE: In sand box context wordMe fails to invoke jQcloud properly when called by this handler more than once; calling wordMe directly from code works fine as per above; problem may not persist once pulling wordArr from storage.
function topicCloudInit() {
  console.log('Initiating jQCloud');
  $('#cloud').jQCloud([], {
    width: 500,
    height: 350
  });

  console.log('Initiating word cloud click handler');
  $('#creator').on('click', function() {
    console.log('new word created');
    var text = $('#wdText').val();
    var uHash = $('#userHash').val();
    var tHash = $('#topicHash').val();
    wordClick(text, uHash, tHash);
    console.log('end of word cloud initiation');
  });

  function wordClick(text, userHashArg, topicIdArg, callback) {
    $.ajax({
      url: '/api/votes',
      type: 'POST',
      data: {name: text, userHash: userHashArg, topicId: topicIdArg},
      cache: false
    })
    .done( function (data) {
      // call the callback function here
      console.log('Successful ajax call:');
      console.log(data);
      // data will return an array of word objects like this: {text:"lorem",weight:5,voteState:-1};
      $('#cloud').jQCloud('update', data);
      // update voteStates
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Failed to send click to database.');
      // call the error version of the callback if any
    });
  }

};

topicCloudInit();

function wordMe(wordName, userHash, topicHash) {
  var newWd = new Word(wordName, userHash, topicHash);
  console.log(newWd);
  wordArr.push(newWd);
  clouderator(wordArr);
};
wordMe('gypsum', 'lksaf9pwurp2o', 'we09r20lksjdf');
wordMe('anchovies', 'lksaf9pwurp2o', 'we09r20lksjdf');
wordMe('ferroconcrete', 'lksaf9pwurp2o', 'we09r20lksjdf');
wordMe('peppers', 'lksaf9pwurp2o', 'we09r20lksjdf');

//NOTE: In sand box context wordMe fails to invoke jQcloud properly when called by this handler more than once; calling wordMe directly from code works fine as per above; problem may not persist once pulling wordArr from storage.
function newOpt() {
  $('#creator').on('click', function() {
    console.log('newOpt start');
    var text = $('#wdText').val();
    var uHash = $('#userHash').val();
    var tHash = $('#topicHash').val();
    wordMe(text, uHash, tHash);
    console.log('newOpt complete');
  });
};
newOpt();

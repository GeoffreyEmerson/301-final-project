//POPULATE WORD CLOUD WITH ITEMS PUSHED TO wordArr BY AGGREGATOR (CURRENTLY BY CONSTRUCTOR)
function clouderator(wordArr,dimensions) {
  $('#cloud').jQCloud(wordArr, {
    width: 500,
    height: 350
  });
  console.log('clouderator complete');
};

//CLICK HANDLER TO SET VOTE STATE OF CLOUD VIEW ITEMS FOR EXPORT BACK TO WD. OBJ.
$('#cloud').on('click', '*', function(ctx) {
  var $vState = $(this).attr('data-votestate');
  if ($vState < 2) {
    $vState ++;
    this.setAttribute('data-votestate', $vState);
  } else if ($vState == 2) {
    $vState = $vState - 3;
    this.setAttribute('data-votestate', $vState);
  }
  // console.log($vState);
  // console.log(this.getAttribute('data-votestate'));
  console.log(this.getAttribute('data-usid'));
  console.log(this.getAttribute('data-topicid'));
  console.log($(this).text());
});

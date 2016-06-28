// Sandbox for jqcloud-sandbox
var testArr = [];

function Word(text, usid, topicid) {
  this.text = text;
  this.weight = 1;
  this.html = {
    'data-usid': usid,
    'data-topicid': topicid,
    'data-votestate': 0,
  };
  this.handlers = {
    click: function(ctx) {
      var $vState = $(this).attr('data-votestate');
      // console.log($vState);
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
      // clouderator(testArr);
    },
    // mouseover: function(ctx) {console.log('hovering over ' + ctx);
    //   console.log(this.getAttribute('data-usid'));
    //   console.log(this.getAttribute('data-topicid'));
    // }
  };
};

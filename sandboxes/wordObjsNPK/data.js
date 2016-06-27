// Sandbox for jqcloud-sandbox
testArr = [];

function Word(text, weight, usid, topicid) {
  this.text = text;
  this.weight = weight;
  this.html = {
    'data-usid': usid,
    'data-topicid': topicid,
    'data-votestate': 0,
  };
  this.handlers = {
    click: function(ctx) {
      var $vState = $(this).attr('data-votestate');
      console.log($vState);
      if ($vState < 2) {
        $vState ++;
        this.setAttribute('data-votestate', $vState);
      } else if ($vState == 2) {
        $vState = $vState - 3;
        this.setAttribute('data-votestate', $vState);
      }
      console.log($vState);
      console.log(this.getAttribute('data-votestate'));
    },
    mouseover: function(ctx) {console.log('hovering over ' + ctx);
      console.log(this.getAttribute('data-usid'));
      console.log(this.getAttribute('data-topicid'));
    }
  };
};

function wordMe() {
  var ipsum = new Word('ipsum', 10, 'lksaf9pwurp2o', 'we09r20lksjdf');
  console.log(ipsum);
  testArr.push(ipsum);
  console.log(testArr);
};
wordMe();

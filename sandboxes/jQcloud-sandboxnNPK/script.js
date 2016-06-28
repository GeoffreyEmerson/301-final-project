// Sandbox for jqcloud-sandbox
$(function() {
  var testArr = [
    {
      text: 'lorem',
      weight: 1,
      html: {},
      handlers: {
        //How should this be formatted? just some functions?
      },
    },
    {
      text: 'ipsum',
      weight: 8,
      html: {
        'data-usid': 'lksaf9pwurp2o',
        'data-topicid': 'we09r20lksjdf',
        'data-votestate': 0,
      },
      handlers: {
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
      },
    },
    {
      text: 'dolor',
      weight: 2,
      html: {},
      handlers: {
        //How should this be formatted? just some functions?
      },
    },
    {
      text: 'sit',
      weight: 3,
      html: {},
      handlers: {
        //How should this be formatted? just some functions?
      },
    },
    {
      text: 'amet',
      weight: 5,
      html: {},
      handlers: {
        //How should this be formatted? just some functions?
      },
    },
  ];

 });

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
          console.log(ctx);
          // testArr[0].weight ++;
          // console.log(testArr[0].weight);
          //write a function here that alters votestate in a four click loop
          // vote0();
          // function vote0() {
          var vState = this.getAttribute('data-votestate');
          console.log(vState);
          if (vState == 0 || vState == '') {
            console.log('I COULDA HADDA V-STATE!');
            this.setAttribute('data-votestate', 1);
            vState = this.getAttribute('data-votestate');
          }
          console.log(vState);
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

  $('#cloud').jQCloud(testArr, {
    width: 500,
    height: 350
  });
});

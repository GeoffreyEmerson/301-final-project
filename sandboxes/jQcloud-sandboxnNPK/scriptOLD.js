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
          var vState = this.getAttribute('data-votestate');
          console.log(vState);
          if (vState == 0) {
            console.log('I COULDA HADDA V-STATE!');
            this.setAttribute('data-votestate', 1);
            // vState = this.getAttribute('data-votestate');
          } else if (vState == 1) {
            console.log('NOW I GOTTA V-STATE!');
            this.setAttribute('data-votestate', 2);
            vState = this.getAttribute('data-votestate');
          } else if (vState == 2) {
            console.log('HEY, I STILL GOTTA V-STATE!');
            this.setAttribute('data-votestate', -1);
            vState = this.getAttribute('data-votestate');
          } else {
            console.log('OOOH, I SHUNTA HADDA V-STATE!');
            this.setAttribute('data-votestate', 0);
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

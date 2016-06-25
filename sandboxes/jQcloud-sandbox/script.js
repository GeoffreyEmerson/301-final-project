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
      html: {},
      handlers: {
        click: function() {alert('You clicked the word !');},
        mouseover: function() {console.log('hovering over ' + this.text);
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

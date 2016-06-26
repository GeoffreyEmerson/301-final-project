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
        click: function(ctx) {console.log(ctx);},
        mouseover: function() {console.log('hovering over ' + ctx);
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

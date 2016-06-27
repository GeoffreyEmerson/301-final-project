$(function() {

  $.ajax({
    url: '/api/events',
    type: 'GET',
    cache: false
  })
  .done( function (data) {
    console.log('Success');
    console.log(data);
    $('p').text(JSON.stringify(data.events));
  })
  .error( function(data,data2,data3) {
    console.log('Fail.');
    console.log(data);
    console.log(data2);
    console.log(data3);
  });
});

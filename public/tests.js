$(function() {

  function getApiRoute(route){
    $.ajax({
      url: '/api/' + route,
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      console.log('Success: GET /api/' + route);
      console.log(data);
      $('#' + route).text(JSON.stringify(data[route]));
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.log('Ajax call failed: GET /api/' + route);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
    });
  }

  getApiRoute('topics');
  getApiRoute('users');
  getApiRoute('attends');
  getApiRoute('votes');

  $.ajax({
    url: '/api/events',
    type: 'POST',
    data: {name: 'My Event'},
    cache: false
  })
  .done( function () {
    // call the callback function here
    getApiRoute('events');
  })
  .fail( function(jqXHR, textStatus, errorThrown) {
    console.log('Ajax call failed: POST /api/events');
    console.log('jqXHR.responseText:',jqXHR.responseText);
    console.log('textStatus:',textStatus);
    console.log('errorThrown:',errorThrown);
    // call the error version of the callback if any
    $('#events').html('Bad post');
  });

});
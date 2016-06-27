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

  getApiRoute('events');
  getApiRoute('topics');
  getApiRoute('users');
  getApiRoute('attends');

});

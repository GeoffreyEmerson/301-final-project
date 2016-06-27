// Sandbox for mongo
$(function() {

  // $.getJSON('/api/events', {param1: 'value1'}, function(json, textStatus) {
  //     /*optional stuff to do after success */
  // });

  $.ajax({
    url: '/api/events',
    type: 'GET',
    cache: false
  })
  .done( function (data) {
    console.log('Success');
    console.log(data[0]);
    console.log(JSON.stringify(data));
    $('p').text();
  })
  .error( function(data,data2,data3) {
    console.log('Fail.');
    console.log(data);
    console.log(data2);
    console.log(data3);
  });
    // type: 'GET',
    // contentType: 'application/json; charset=utf-8',
    // success: function (data) {
    //   console.log('Success');
    //   console.log(data);
    // },
    // error: function (response) {
    //   console.log('AJAX call failure.');
    //   console.log(response);
      // var r = jQuery.parseJSON(response.responseText);
      // console.log('Message: ' + r.Message);
      // console.log('StackTrace: ' + r.StackTrace);
      // console.log('ExceptionType: ' + r.ExceptionType);
  //   }
  // })
  // .fail(
  //   function(xhr, textStatus, errorThrown) {
  //     console.error('AJAX request error.');
  //     console.error(xhr);
  //     console.error(textStatus);
  //     console.error(errorThrown);
  //   }
  // )
  // ;

});

(function(module) {

  var HomeModel = {};

  HomeModel.getRsvp = function(userHash,eventHash, callback){
    $.ajax({
      url: '/api/rsvps/' + eventHash + '/' + userHash,
      type: 'GET',
      cache: false
    })
    .done(function(data) {
      console.log('Ajax call for Rsvp data:',data);
      // TODO: This function should, when done, persist attendance state.
      //  I'm getting an object but it's always the same.

      if (callback) callback(data);
      return data;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      // call the error version of the callback if any
      if (callback) callback();
    });
  };

  module.HomeModel = HomeModel;
})(window);

(function(module) {

  function EventObject(){}

  // This method creates a new record in the database and stores the session information.
  EventObject.prototype.saveToDB = function(callback) {
    var currentEvent = this;
    console.assert(currentEvent.eventName, {'message':'Problem with eventName', 'currentEvent.eventName':currentEvent.eventName});
    $.ajax({
      url: '/api/events',
      type: 'POST',
      data: {name: currentEvent.eventName},
      cache: false
    })
    .done( function (data) {
      console.assert(data.event.name && data.event.hash, {'message':'Problem creating event record','data.event.name':data.event.name,'data.event.hash':data.event.hash});
      // After successfully creating a new record for the event, store the info
      currentEvent.eventHash = data.event.hash; // event.hash is created by the API.
      currentEvent.urlHash = window.location.protocol + '//' + window.location.host + '/eventhash/' + currentEvent.eventHash;
      Session.updateEvent(data.event.name, data.event.hash);
      if (callback) callback(currentEvent);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events,', this.eventName);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentEvent);
    });
  };

  // This method updates the event record in the database and updates the session information.
  //  Note: it requires an object with the eventHash and any updated info.
  EventObject.updateEventInDB = function(eventInfo, callback) {
    console.assert(eventInfo, {'message':'Problem with eventInfo', 'eventInfo':eventInfo});
    $.ajax({
      url: '/api/events/' + currentEvent.eventHash,
      type: 'PUT',
      data: eventInfo,
      cache: false
    })
    .done( function (data) {
      console.log('Event data updated in DB. Returned data:', data);
      Session.updateEvent(data.event.name, data.event.hash);
      if (callback) callback(data);
      return data;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events,', eventInfo);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  EventObject.prototype.recoverFromHash = function(callback) {
    var currentEvent = this;
    $.ajax({
      url: '/api/events/' + currentEvent.eventHash,
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      console.log('Loaded data from url hash:',data);
      if (data.event.name && data.event.hash) {
        currentEvent.eventName = data.event.name;
        currentEvent.eventHash = data.event.hash;
        Session.updateEvent(data.event.name, data.event.hash);
        if (callback) callback(currentEvent);
      } else {
        // Hopefully this will never happen.
        console.error('Ajax call successful, but event data was incomplete:', data);
        if (callback) callback(currentEvent);
      };
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: GET /api/events/' + eventHash);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback(currentEvent);
    });
  };

  module.EventObject = EventObject;
}(window));

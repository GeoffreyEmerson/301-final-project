(function(module) {

  function EventObject(eventName, callback){
    this.eventName = eventName;

    this.saveToDB(callback);
  }

  // This method creates a new record in the database and stores the session information.
  EventObject.prototype.saveToDB = function(callback) {
    console.assert(this.eventName, 'Problem with eventName', this.eventName);
    $.ajax({
      url: '/api/events',
      type: 'POST',
      data: {name: this.eventName},
      cache: false
    })
    .done( function (data) {
      console.log('Creating new event. Data returned:',data);
      console.assert(data.event.name, 'Problem creating event record, eventName:',data.event.name);
      console.assert(data.event.hash, 'Problem creating event record, eventHash:',data.event.hash);
      // After successfully creating a new record for the event, store the info
      this.eventHash = data.event.hash; // event.hash is created by the API.
      Session.updateEvent(data.event.name, data.event.hash);
      if (callback) callback(data);
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.error('Ajax call failed: POST /api/events,', this.eventName);
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  // This method updates the event record in the database and updates the session information.
  //  Note: it requires an object with the eventHash and any updated info.
  EventObject.updateEventInDB = function(eventInfo, callback) {
    console.assert(eventInfo, 'Problem with eventInfo', eventInfo);
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

  module.EventObject = EventObject;
}(window));

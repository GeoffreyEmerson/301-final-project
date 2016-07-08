(function(model){

  var Event = new EventObject();

  Event.newEvent = function(eventName, callback) {
    this.createEvent(eventName,function(result) {
      Event = result;
      console.log('New Event.name set: ' + Event.name);
      console.log('New Event.hash set: ' + Event.hash);
      if(callback) callback(Event);
    });
  };

  Event.initEventPage = function(ctx,next) {
    EventView.initEventView(next);
  };

  Event.getEventFromHash = function(ctx,next) {
    console.log(Event);
    Event.hash = ctx.params.eventHash;
    Event.loadEventFromDB(function(result) {
      if (result && result.name) {
        Event = result;
        getTopicId(Event.hash,function(){
          if (next) next();
        });
      } else {
        console.error('Problem retrieving Event from Hash:',this);
        // TODO: Display a message to the user about the bad hash
        //  Give button to start at home page?
      }
    });

    // TODO: Move to topic-controller
    function getTopicId(eventHash,callback) {
      $.ajax({
        url: '/api/topics/',
        type: 'GET',
        cache: false
      })
      .done( function (data) {
        // call the callback function here
        console.log('getTopicId data:',data);
        var topicId = data.topics.filter(function(topic){
          if(topic.eventHash == eventHash) return true;
        });
        if (topicId.length) {
          $('#timing').attr('data-topicId',topicId[0]._id);
          if (callback) callback();
        } else {
          // Hopefully this will never happen.
          console.error('GET /api/topics/ Ajax call successful, but no topicIds returned!');
          if (callback) callback();
        };
      })
      .fail( function(jqXHR, textStatus, errorThrown) {
        console.warn('Ajax call failed: GET /api/events/' + eventHash);
        console.log('jqXHR.responseText:',jqXHR.responseText);
        console.log('textStatus:',textStatus);
        console.log('errorThrown:',errorThrown);
        // call the error version of the callback if any
        if (callback) callback();
      });
    }
  };

  Event.handleSubmitComment = function(clickEvent) {
    clickEvent.preventDefault();
    Event.date = $('#date').val().trim();
    Event.times = $('#times').val().trim();
    Event.description = $('#event-description').val().trim();
    Event.updateEventInDB(function(updatedEvent){
      EventView.updateDetails(updatedEvent);
    });
  };

  //TODO use this handlebars method to ger real data from our user database
  function userTest(userName, status, css) {
    this.userName = userName;
    this.status = status;
    this.css = css;
  };
  var testObject = [
    new userTest('Bob', 'attending','approve'),
    new userTest('Bill', 'maybe', 'maybe'),
    new userTest('Sarah', 'no', 'disapprove')
  ];
  var newTemplate = $('#guests').html();
  var compiled = Handlebars.compile(newTemplate);
  var guestList = compiled({testObject:testObject});
  $('#user-info').append(guestList);

  model.Event = Event;
})(window);

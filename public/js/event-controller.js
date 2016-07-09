(function(model){

  var Event = new EventObject();

  Event.newEvent = function(eventName, callback) {
    this.createEvent(eventName,function(result) {
      Event = result;
      if(callback) callback(Event);
    });
  };

  Event.initEventPage = function(ctx,next) {
    Event.prepHandlebars();
    EventView.initEventView(next);
  };

  Event.getEventFromHash = function(ctx,next) {
    Event.hash = ctx.params.eventHash;
    Event.loadEventFromDB(function(result) {
      if (result && result.name) {
        Event = result;
        getTopicId(Event._id,function(){
          if (next) next();
        });
      } else {
        console.error('Problem retrieving Event from Hash:',ctx.params);
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

  Event.prepHandlebars = function(){
    var rsvpTemplate = $('#guests').html();
    Event.rsvpsToHtml = Handlebars.compile(rsvpTemplate);
  };

  Event.updateRsvps = function(){
    // get list of rsvps from DB
    // ren the list through the handlebars function
    // send the html to the view?
    //TODO use this handlebars method to ger real data from our user database
    function rsvpObject(userName, status, css) {
      this.userName = userName;
      this.status = status;
      this.css = css;
    };
    var rsvpList = [
      new rsvpObject('Bob', 'attending','approve'),
      new rsvpObject('Bill', 'maybe', 'maybe'),
      new rsvpObject('Sarah', 'no', 'disapprove')
    ];

    console.log('this is:',this);
    this.getRsvpListFromDB(function(updatedRsvpList){
      console.log('updatedRsvpList',updatedRsvpList);
      var guestListHtml = Event.rsvpsToHtml({rsvp:rsvpList});
      $('#user-info').append(guestListHtml); // TODO: put this in EventView
    });

  };

  model.Event = Event;
})(window);

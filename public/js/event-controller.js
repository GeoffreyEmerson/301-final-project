(function(model){

  var Event = new EventObject();

  Event.newEvent = function(eventName, callback) {
    this.eventName = eventName;
    this.saveToDB(function(result) {
      Event = result;
      if(callback) callback();
    });
  };

  Event.initEventPage = function(ctx,next) {
    console.log('initEventPage called.');

    // If no session, go to home page. This is for unexpected direct links to the event route, such as a page reload after a long period of being away.
    if (!Session.getEventName()) {
      page.show('/');
    }

    EventView.initEventView();

    console.log('initEventPage completed.');
    if (next) next();
  };

  Event.getEventFromHash = function(ctx,next) {
    this.eventHash = ctx.params.eventHash;
    this.recoverFromHash(function(result) {
      if (result && result.eventName) {
        Event = result;
        getTopicId(Event.eventHash,function(){
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

  Event.createUserName = function(nameArg, callback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      data: {name: nameArg},
      cache: false
    })
    .done( function (data) {
      // TODO: Get data from proper source.
      throw 'saltDom is deprecated';
      saltDom('#user-id','user',data.user.userHash,data.user.name);
      setCookie('userHash', data.user.userHash, 10);
      setCookie('userName', data.user.name, 10);
      if (callback) callback();
    })
    .fail( function() {
      console.error('Name creation failed (event-controller.js)');
      if (callback) callback();
    });
  };

  Event.handleSubmitComment = function(event) {
    event.preventDefault();
    var date = $('#date').val().trim();
    var times = $('#times').val().trim();
    var description = $('#event-description').val().trim();
    console.log(date, times, eventDescription);
    // TODO: Save admin input to DB.
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

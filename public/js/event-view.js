(function(module) {

  var EventView = {};
  var $tatus = $('#status');

  EventView.initEventView = function (next) {
    // This only sets up the top section. A subsection (tab) is also needed to complete a page.
    $('.page').hide();
    $('.nav-main').show();
    $('#event').show();

    // Display the event name and user name.
    $('#event-name').text(Event.name);
    $('#user-id h4').text(User.name);

    // Set up the Rsvp status button colors for the current user
    User.getRsvpStatus(function(rsvpStatus){
      // TODO: Consider moving the logic to the controller, and use a more direct version of EventView.updateRsvpButton for the view changes.
      if (rsvpStatus == 1) {
        $tatus.removeClass('blank');
        $tatus.addClass('maybe');
        $tatus.children().text('Maybe');
        $('#status-instructions').remove();
      } else if (rsvpStatus == 2) {
        $tatus.removeClass('blank');
        $tatus.addClass('approve');
        $tatus.children().text('Yep');
        $('#status-instructions').remove();
      } else if(rsvpStatus == -1) {
        $tatus.removeClass('blank');
        $tatus.addClass('disapprove');
        $tatus.children().text('Nope');
        $('#status-instructions').remove();
      }
    });

    // Set listener for Rsvp button
    $tatus.off(); // Remove any previously applied.
    $tatus.on('click', function() {
      User.updateRsvp(function(result) {
        EventView.updateRsvpButton(result);
        Event.updateRsvps();
      });
    });

    //This function creates a new button and appends it to the nav bar. the a href is given
    //to the cluster section.
    // TODO: figure out out to dynamically make a route, or otherwise show new topic when clicked
    $('#add').on('submit', function(event) {
      event.preventDefault();
      var topic = $('#topic').val().trim();
      if(topic){
        $('#topic').val('');
        console.log('New Topic submitted:',topic);
        // page('event/' + topic, logRoute, Event.initEventPage, function(){
        //   showPage($event);
        //   $('#newClustersHere').append('<section class="page" id="' + topic + '"></section>');
        //   $('#' + topic).show();
        //   TopicView.topicCloudInit(topic);
        //   $('#newClustersHere').append('<div class="page"> <form class="row" action="index.html" method="post"> <input class="u-full-width" type="text" name="word" placeholder="Create Option"> <input class="button-primary u-full-width" type="button" name="submit" value="CREATE"> <input type="text" visibility="hidden" value="lksaf9pwurp2o"> <input type="text" value="we09r20lksjdf"></div>');
        //   $('#googleAPI').hide();
        //   $('.nav-main').show();
        // });
        $('<a href="/event/' + topic + '" class="button button-primary" id="new-topic">' + topic + '<a>').prependTo('#event-navigation');
      }
    });

    // Experimental: These methods set up subviews, even though they are hidden.
    CalendarView.initCalendarView();
    TopicView.topicCloudInit('cloud');
    TopicController.initCloudItemClickHandler();

    next(); // Goes to subview defined in route.
  };

  /*--------------------
  -- Define Sub-Views --
  --------------------*/

  EventView.initDetailsSubview = function(ctx,next){
    $('#details').show();
    $('#googleAPI').show();
    EventView.triggerMapResize();

    // Generate shareable link
    $('#share-url').val(Event.urlHash);
    $('#share-url').off();
    $('#share-url').on('focus', function(){
      this.select();
    });

    // Set listener on admin input submit button
    $('#admin-input').off();
    $('#admin-input').on('submit', Event.handleSubmitComment);
    if (Event.date || Event.times || Event.description) {
      EventView.updateDetails(Event);
    }

    //NOTE: Do not use next() for final subview inits. It causes a page reload by page.js.
  };

  EventView.initTimingSubview = function(ctx,next){
    $('#timing').show();
    $('#googleAPI').hide();
  };

  EventView.initStatusSubview = function(ctx,next){
    Event.updateRsvps();
    $('#status-content').show();
    $('#googleAPI').show();
  };

  EventView.initClusterSubview = function(ctx,next){
    $('#cluster').show();
    $('#googleAPI').show();
  };

  EventView.initAddTopicSubview = function(ctx,next){
    $('#add').show();
    $('#googleAPI').show();
  };

  /*-----------------
  -- Other Methods --
  -----------------*/

  EventView.updateRsvpButton = function (newStatus) {
    // TODO: Consider using newStatus instead of toggles?
    if ($tatus.hasClass('blank')) { //If blank -> maybe
      $tatus.toggleClass('blank maybe');
      $tatus.children().text('Maybe');
      $('#status-instructions').remove();
    } else if ($tatus.hasClass('maybe')) { //If maybe -> going
      $tatus.toggleClass('maybe approve');
      $tatus.children().text('Yep');
    } else if ($tatus.hasClass('approve')) { //if going -> not going
      $tatus.toggleClass('approve disapprove');
      $tatus.children().text('Nope');
    } else if ($tatus.hasClass('disapprove')) { //if not going -> blank
      $tatus.toggleClass('disapprove blank');
      $tatus.children().text('Going?');
    }
  };

  EventView.updateDetails = function(currentEvent) {
    if (currentEvent.date) $('#date').attr('value', currentEvent.date);
    if (currentEvent.times) $('#times').attr('value', currentEvent.times);
    if (currentEvent.description) $('#event-description').val(currentEvent.description);
    $('#admin-input-button').attr('value', 'Update');
  };

  EventView.updateRsvpList = function(guestListHtml) {
    $('#user-info').html(guestListHtml);
  };

  /*----------------------
  -- Google Map Methods --
  ----------------------*/

  var map;

  EventView.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {
        lat: 45.5231,
        lng: -122.6765
      },
    });
    var geocoder = new google.maps.Geocoder();
    $('#submit-event').on('submit', function(event) {
      event.preventDefault();
      geocodeAddress(geocoder, map);
      var address = $('#address').val();
      console.log(address);
    });
  };

  EventView.triggerMapResize = function(){
    if (map){
      google.maps.event.trigger(map, 'resize');
    }
  };

  //allows us to use submission form to input address, this function converts our address to lat & long
  function geocodeAddress(geocoder, resultsMap) {
    var address = $('#address').val();
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  module.EventView = EventView;
})(window);

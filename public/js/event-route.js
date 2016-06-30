// / convoke homepage user enters event name to create event
// /event a list view of events people have created
// /event/:id view the event page for specific event includes event subpages
          //This is where people add topics
          //view cloud to vote on topics
          //view timing chart
// /event/:id/edit only the event author can edit event
          //event author can update event name
          //event author can update location and date
          //author can update attendees
// /event/:id/timing this shows specific event timing chart
            // see times other people voted on
            // vote on your preferred time
// /event/:id/clusters this shows specific event cluster chart
            //shows the word cloud of topics
            //allow people to add a topics
            //allow people to vote on topic

var $homepage = $('#homepage');
var $event = $('#event');
var $name = $('#name');
var $admin = $('#event');
var $404 = $('#not-found');

page.base('/');
// page('*', logRoute);

page('/', function() {
  showPage($homepage);
});

page('event', function() {
  showPage($event);
  $('#googleAPI').show();
  triggerMapResize();
});

page('name/:id', function(ctx) {
  showPage($name);
  var eventHash = ctx.params.id;
  $('#create-name').off().on('submit', function(event) {
    event.preventDefault();
    var nameValue = $('#name-value').val();
    $.ajax({
      url: 'api/events/' + eventHash,
      method: 'put',
      data: {
        //we have the name from the form field but I need to figure out how to get a user hash from this.
        organizer: ['168a592b214911fe8a5dcdb776856224']
      }
    }).done(function(data) {
      var hash = data.event.hash;
      console.log(data);
      // page('/event/' + hash);
    });
  });
});

page('event', initEventPage);
page(':eventHash', initEventPage);
page(':eventHash/event', initEventPage);

//////////////////////////////////////
page('event/timing', function() {
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
});

page(':id/event/timing', function() {
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
});

//////////////////////////////////////
page('event/status', function() {
  showPage($event);
  $('#status-content').show();
  $('#googleAPI').show();
});

//////////////////////////////////////
page('event/clusters', function() {
  showPage($event);
  $('#cluster').show();
  $('#googleAPI').show();
});

//////////////////////////////////////
page('event/add', function() {
  showPage($event);
  $('#add').show();
  $('#googleAPI').show();
});

//gets text input from the event submission form and logs it to page and advances to name page
$('#create-event').on('submit', function(event) {
  event.preventDefault();
  var eventValue = $('#event-value').val();
  $.post('/api/events', {
    name: eventValue
  }).done(function(data) {
    var hash = data.event.hash;
    page('/name/' + hash);
  });
});

//gets text input fromt the add button and will push to database, which will in turn populate the word cluster.
//Then the function automatically takes us to the clusters page.
$('#add-topic').on('click', function(event) {
  event.preventDefault();
  var topicValue = $('#topic').val();
  console.log(topicValue);
  // location = '/event/clusters';
});

page();

function showPage($element) {
  $('.page').hide();
  $element.show();
}

function logRoute(ctx, next) {
  console.log(ctx.path);
  if (next) next();
}

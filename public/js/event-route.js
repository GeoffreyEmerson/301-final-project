var $homepage = $('#homepage');
var $event = $('#event');
var $name = $('#name');
var $admin = $('#event');
var $404 = $('#not-found');

page.base('/');
// page('*', logRoute);

page('/', logRoute, function() {
  showPage($homepage);
});

page('name', logRoute, function() {
  showPage($name);
});

page('event', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView);
page('eventhash/:eventHash', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView);

//////////////////////////////////////
page('event/timing', logRoute, function() {
  calendarView.initCalendarView();
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
});

page(':id/event/timing', logRoute, function() {
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
});

//////////////////////////////////////
page('event/status', logRoute, function() {
  showPage($event);
  $('#status-content').show();
  $('#googleAPI').show();
});

//////////////////////////////////////
page('event/clusters', logRoute, function() {
  showPage($event);
  $('#cluster').show();
  $('#googleAPI').show();
});

//////////////////////////////////////
page('event/add', logRoute, function() {
  showPage($event);
  $('#add').show();
  $('#googleAPI').show();
});

//gets text input from the event submission form and logs it to page and advances to name page
$('#create-event').on('submit', function(event) {
  event.preventDefault();
  var eventValue = $('#event-value').val();
  console.log(eventValue);
  EventController.createEvent(eventValue, function() {
    page.show('name');
    // history.pushState({},'','/name');
    // showPage($name);
    $('#name-value').focus();
  });
});

//gets text input from the name submission form and posts to the api and advances to event page
$('#create-name').on('submit', function(event){
  event.preventDefault();
  var nameValue = $('#name-value').val();
  console.log(nameValue);
  EventController.createUserName(nameValue);
  page.show('event');
  // history.pushState({},'','/event');
  // EventController.initEventPage();
});

//gets text input from the add button and will push to database, which will in turn populate the word cluster.
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
  console.log('page.js route called: ',ctx.path);
  if (next) next();
}

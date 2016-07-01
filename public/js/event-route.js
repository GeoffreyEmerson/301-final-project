var $homepage = $('#homepage, #navigation');
var $event = $('#event');
var $name = $('#name, #navigation');
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

//right now the admin page is just set to be equal with the event page. leaving the code
//below in case we need to use it.
// page('admin', function() {
//   showPage($admin);
// });

//gets text input from the event submission form and logs it to page and advances to name page
$('#create-event').on('click', function(event){
  event.preventDefault();
  var eventValue = $('#event-value').val();
  console.log(eventValue);
  EventController.createEvent(eventValue, function() {
    history.pushState({},'','/name');
    showPage($name);
  });
});

//gets text input from the name submission form and posts to the api and advances to event page
$('#create-name').on('click', function(event){
  event.preventDefault();
  var nameValue = $('#name-value').val();
  console.log(nameValue);
  EventController.createUserName(nameValue);
  history.pushState({},'','/event');
  EventController.initEventPage();
});

//gets text input from the add button and will push to database, which will in turn populate the word cluster.
//Then the function automatically takes us to the clusters page.
$('#add-topic').on('click', function(event){
  event.preventDefault();
  var topicValue = $('#topic').val();
  console.log(topicValue);
  location = '/event/clusters';
});

// page('admin/timing', function() {});
// page('admin/status', function() {});
// page('admin/clusters', function() {});

page();

function showPage($element) {
  $('.page').hide();
  $element.show();
}

function logRoute(ctx, next) {
  console.log('page.js route called: ',ctx.path);
  if (next) next();
}

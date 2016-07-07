//var $event = $('#event');
//var $404 = $('#not-found');

page.base('/');

page(['','event'], logRoute, Session.check, Event.initEventPage, EventView.initDetailsSubview);
page('new', logRoute, CreateController.init);
page('name', logRoute, NameController.init);
page('eventhash/:eventHash', logRoute, Event.getEventFromHash, Session.check, Event.initEventPage, EventView.initDetailsSubview);

//////////////////////////////////////
page('event/timing', logRoute, Event.initEventPage, function() {
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
  $('.nav-main').show();
  CalendarView.initCalendarView();
});

page(':id/event/timing', logRoute, Event.initEventPage, function() {
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
  CalendarView.initCalendarView();
});

//////////////////////////////////////
page('event/status', logRoute, Event.initEventPage, function() {
  showPage($event);
  $('#status-content').show();
  $('#googleAPI').show();
  $('.nav-main').show();
});

//////////////////////////////////////
page('event/clusters', logRoute, Event.initEventPage, function() {
  showPage($event);
  $('#cluster').show();
  $('#googleAPI').show();
  $('.nav-main').show();
  TopicView.topicCloudInit('cloud');
  TopicController.initCloudItemClickHandler();
});

//////////////////////////////////////
page('event/add', logRoute, Event.initEventPage, function() {
  showPage($event);
  $('#add').show();
  $('#googleAPI').show();
  $('.nav-main').show();
});

// page('*', logRoute, notFound); // TODO: Figure out how to not match every damn time

page();

// function notFound(ctx,next) {
//   console.error('Route not found:',ctx);
//   if (next) next();
// }

// $('#clear-topic').on('click', function(){
//   $('a').remove('#new-topic');
// });

function showPage($element) {
  $('.page').hide();
  $element.fadeIn();
}

function logRoute(ctx, next) {
  console.log('▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼');
  console.log('page.js route called: ', ctx.path);
  if (next) next();
  console.log('▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲');
}

var $homepage = $('#homepage');
var $event = $('#event');
var $name = $('#name');
var $admin = $('#event');
var $404 = $('#not-found');

var secondCluster = '';
page.base('/');
// page('*', logRoute);

page('/', logRoute, function() {
  showPage($homepage);
  $('.nav-main').hide();
});

page('name', logRoute, function() {
  showPage($name);
  $('.nav-main').hide();
});

page('event', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView, function(){
  $('.nav-main').show();
});

page('eventhash/:eventHash', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView, function(){
  $('.nav-main').show();
});

//////////////////////////////////////
page('event/timing', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView, function() {
  // CalendarView.initCalendarView();
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
  $('.nav-main').show();
  CalendarView.initCalendarView();

});

page('event/' + secondCluster, logRoute, function(){
  showPage($event);
});

page(':id/event/timing', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView,function() {
  // CalendarView.initCalendarView();
  showPage($event);
  $('#timing').show();
  $('#googleAPI').hide();
  CalendarView.initCalendarView();
});

//////////////////////////////////////
page('event/status', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView,function() {
  showPage($event);
  $('#status-content').show();
  $('#googleAPI').show();
  $('.nav-main').show();
});

//////////////////////////////////////
page('event/clusters', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView,function() {
  showPage($event);
  $('#cluster').show();
  $('#googleAPI').show();
  $('.nav-main').show();
});

//////////////////////////////////////
page('event/add', logRoute, EventController.initEventPage, EventView.initEventView, HomeView.initHomeView,function() {
  showPage($event);
  $('#add').show();
  $('#googleAPI').show();
  $('.nav-main').show();
});

//gets text input from the event submission form and logs it to page and advances to name page
$('#create-event').on('submit', function(event) {
  event.preventDefault();
  var eventValue = $('#event-value').val();
  console.log(eventValue);
  EventController.createEvent(eventValue, function() {
    page.show('name');
    $('#name-value').focus();
    // history.pushState({},'','/name');//this was commented
    // showPage($name); //this was commented
  });
});

//gets text input from the name submission form and posts to the api and advances to event page
$('#create-name').on('submit', function(event){
  event.preventDefault();
  var nameValue = $('#name-value').val();
  console.log(nameValue);
  EventController.createUserName(nameValue);
  page.show('event');
  $('.nav-main').show();
  // history.pushState({},'','/event'); //this was commented
  // EventController.initEventPage(); //this was commented
});

//This function creates a nw ahref button and appends to the nav bar. the a href is given
//to the cluster section. Can not figure out out to dynamically make a route
$('#add').on('submit', function(event) {
  event.preventDefault();
  var topic = $('#topic').val().trim();
  if(topic){
    $('#topic').val('');
    console.log(topic);
    secondCluster = topic;
    console.log(secondCluster);
    $('<a href="/event/' + topic + '" class="button button-primary" id="new-topic">' + topic + '<a>').prependTo('#event-navigation');
  }
  // location = '/event/clusters';
});
$('#clear-topic').on('click', function(){
  $('a').remove('#new-topic');
});

page();

function showPage($element) {
  $('.page').hide();
  $element.fadeIn();
}

function logRoute(ctx, next) {
  console.log('page.js route called: ',ctx.path);
  if (next) next();
}

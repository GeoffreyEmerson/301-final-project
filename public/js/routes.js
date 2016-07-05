var $event = $('#event');
var $admin = $('#event');
var $404 = $('#not-found');

page.base('/');

page('', logRoute, CreateController.init);

page('name', logRoute, NameController.init);

page('event',
  logRoute,
  Event.initEventPage,
  function(){
    $('.nav-main').show();
  }
);

page('eventhash/:eventHash',
  logRoute,
  Event.getEventFromHash,
  function(){
    page.show('name');
  }
);

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

//This function creates a nw ahref button and appends to the nav bar. the a href is given
//to the cluster section.
// TODO: Move this to event view.
// TODO: figure out out to dynamically make a route, or otherwise show new topic when clicked
$('#add').on('submit', function(event) {
  event.preventDefault();
  var topic = $('#topic').val().trim();
  if(topic){
    $('#topic').val('');
    console.log(topic);
    page('event/' + topic, logRoute, Event.initEventPage, function(){
      showPage($event);
      $('#newClustersHere').append('<section class="page" id="' + topic + '"></section>');
      $('#' + topic).show();
      TopicView.topicCloudInit(topic);
      $('#newClustersHere').append('<div class="page"> <form class="row" action="index.html" method="post"> <input class="u-full-width" type="text" name="word" placeholder="Create Option"> <input class="button-primary u-full-width" type="button" name="submit" value="CREATE"> <input type="text" visibility="hidden" value="lksaf9pwurp2o"> <input type="text" value="we09r20lksjdf"></div>');
      $('#googleAPI').hide();
      $('.nav-main').show();
    });
    $('<a href="/event/' + topic + '" class="button button-primary" id="new-topic">' + topic + '<a>').prependTo('#event-navigation');
  }
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

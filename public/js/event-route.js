function logRoute(ctx, next) {
  console.log(ctx.path);
  if (next) {
    next();
  }
}

var $homepage = $('#homepage, #navigation');
var $event = $('#event');
var $admin = $('#event');
var $404 = $('#not-found');

page.base('/');
page('*', logRoute);
page('/', function() {
  showPage($homepage);
});

page('event', function() {
  showPage($event);
  triggerMapResize();
});

page('event/timing', function() {
  showPage($event);
  $('#timing').show();
});

page('event/status', function() {
  showPage($event);
  $('#status-content').show();
});

page('event/clusters', function() {
  showPage($event);
  $('#cluster').show();
});
//right now the admin page is just set to be equal with the event page. leaving the code
//below in case we need to use it.
page('admin', function() {
  showPage($admin);
});

page('admin/timing', function() {});
page('admin/status', function() {});
page('admin/clusters', function() {});
page();

function showPage($element) {
  $('.page').hide();
  $element.show();
}

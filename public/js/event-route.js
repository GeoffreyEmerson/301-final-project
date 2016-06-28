function logRoute(ctx, next) {
  console.log(ctx.path);
  if (next) {
    next();
  }
}

var $homepage = $('#homepage, #navigation');
var $event = $('#event, #navigation, #mapbox');
var $admin = $('#event, #navigation, #mapbox');
var $404 = $('#not-found');

page.base('/');
page('*', logRoute);
page('/', function() {
  showPage($homepage);
});

page('event', function() {
  showPage($event);
});
page('event/timing', function() {
  showPage($event);
  $('timing').show();
});
page('event/status', function() {});
page('event/clusters', function() {});

page('admin', function() {
  showPage($admin);
});

page('admin/timing', function() {});
page('admin/status', function() {});
page('admin/clusters', function() {});
page();

function showPage($element) {
  $('.container').hide();
  $element.show();
}

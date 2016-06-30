function logRoute(ctx, next) {
  console.log(ctx.path);
  if (next) {
    next();
  }
}
page.base('/');
page('*', logRoute);
page('/', function() {});
page('event', function() {});
page('event/timing', function() {});
page('event/status', function() {});
page('event/clusters', function() {});
page('admin', function() {});
page('admin/timing', function() {});
page('admin/status', function() {});
page('admin/clusters', function() {});
page();

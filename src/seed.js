var Event = require('./models/event.js');

var events = [
  'shindig',
  'throng',
  'bash'
];

events.forEach(function(event, index) {
  Event.find({'name': event}, function(err, events){
    if(!err && !events.length) {
      Event.create({test:true, name: event});
    };
  });
});

var Event = require('./models/event.js');

var events = [
  { name: 'Shelly\'s Shindig', hash: '30de54ffc74bb4b2db9b9b84f08ef311' },
  { name: 'Baily\'s BBQ', hash: '33e6ebb1424cc9ab7042b1de5d998d0b' },
  { name: 'Hubert\s Hoedown', hash: '5ad8b2b32c989956438f454b0375d90f' },
  { name: 'Gloria\'s Gala', hash: 'dac4b47c9b07d2aac3c40799a6448e62' },
  { name: 'Dave\'s Dinner', hash: 'f6d06cb6677e99a5f2c42d1fc7ff73ee' },
  { name: 'Rita\'s Riot', hash: '9848cadc98df4f3eae4ea6a62e2c02ee' },
  { name: 'Sandra\'s Soiree', hash: '64be58a55aef82f3c3f517e304a3198d' }
];

events.forEach(function(event, index) {
  Event.find({'name': event.name}, function(err, events){
    if(!err && !events.length) {
      Event.create(event);
    };
  });
});

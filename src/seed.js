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

var Topic = require('./models/topic.js');

var topics = [
  {name: 'eventStartTopic', description: 'When are y\'all availble?', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {name: 'Food', description: 'What kinda food y\'all want?', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {name: 'eventStartTopic', description: 'When should we start?', eventHash: '30de54ffc74bb4b2db9b9b84f08ef311'},
  {name: 'Activities', description: 'What is everybody up for?', eventHash: '30de54ffc74bb4b2db9b9b84f08ef311'},
  {name: 'eventStartTopic', description: 'When?', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {name: 'Game', description: 'Which board game?', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {name: 'eventStartTopic', description: 'When?', eventHash: 'dac4b47c9b07d2aac3c40799a6448e62'},
  {name: 'Food', description: 'What food?', eventHash: 'dac4b47c9b07d2aac3c40799a6448e62'},
  {name: 'Location', description: 'Who\'s house should we meet at?', eventHash: 'f6d06cb6677e99a5f2c42d1fc7ff73ee'},
  {name: 'Movie', description: 'What movie should we watch?', eventHash: 'f6d06cb6677e99a5f2c42d1fc7ff73ee'},
  {name: 'eventStartTopic', description: 'When?', eventHash: '9848cadc98df4f3eae4ea6a62e2c02ee'},
  {name: 'Food', description: 'What food?', eventHash: '9848cadc98df4f3eae4ea6a62e2c02ee'},
  {name: 'eventStartTopic', description: 'When?', eventHash: '64be58a55aef82f3c3f517e304a3198d'},
  {name: 'Food', description: 'What food?', eventHash: '64be58a55aef82f3c3f517e304a3198d'}
];

topics.forEach(function(topic, index) {
  Topic.find({'name': topic.name, 'eventHash': topic.eventHash}, function(err, topics){
    if(!err && !topics.length) {
      Event.create(topic);
    };
  });
});

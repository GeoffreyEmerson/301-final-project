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
  {name: 'eventStartTopic', description: 'When are y\'all availble?', eventHash: '33e6ebb1424cc9ab7042b1de5d998d0b'},
  {name: 'Food', description: 'What kinda food y\'all want?', eventHash: '33e6ebb1424cc9ab7042b1de5d998d0b'},
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
  Topic
  .find({'name': topic.name})
  .where('eventHash').equals(topic.eventHash)
  .exec(function(err, topics){
    if(!err && !topics.length) {
      Topic.create(topic);
    };
  });
});

var User = require('./models/user.js');

var users = [
  {name: 'Shelly', userHash: '168a592b214911fe8a5dcdb776856224'},
  {name: 'Baily', userHash: '2e8a245c471431342dddb090871dfd2c'},
  {name: 'Hubert', userHash: '965b9355546c2f1bd4ddcde6024b4e8c'},
  {name: 'Gloria', userHash: '4517d10a35565b942d5fc92c5a4f9af1'},
  {name: 'Dave', userHash: '4cc207a472ad9b0b4bf882e8133bf242'},
  {name: 'Rita', userHash: '71c0989f48b5fabe5487617f2506b80a'},
  {name: 'Sandra', userHash: '0bbcef19fc0d9dfb122da12f9520e248'},
  {name: 'Jenny', userHash: '1f3384febe0e82413ff01905f82c8ef7'},
  {name: 'Bob', userHash: 'ecaf1f59bf8ca47c41df101e76c97734'},
  {name: 'Gene', userHash: '07c15306bbfb12f53868aeb9b8aa3fcf'},
  {name: 'Stan', userHash: '0b1ddd48205beaf7067b1ea51599daa6'},
  {name: 'Roger', userHash: '4571e0144d21551ab6ed85ba8d8f3c53'}
];

users.forEach(function(user, index) {
  User
  .find({'name': user.name})
  .where('userHash').equals(user.userHash)
  .exec(function(err, users){
    if(!err && !users.length) {
      User.create(user);
    };
  });
});

var Rsvp = require('./models/rsvp.js');

var rsvps = [
  {status: 2, userHash: '168a592b214911fe8a5dcdb776856224', eventHash: '30de54ffc74bb4b2db9b9b84f08ef311'},
  {status: 2, userHash: '2e8a245c471431342dddb090871dfd2c', eventHash: '33e6ebb1424cc9ab7042b1de5d998d0b'},
  {status: 2, userHash: '965b9355546c2f1bd4ddcde6024b4e8c', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {status: 2, userHash: '4517d10a35565b942d5fc92c5a4f9af1', eventHash: 'dac4b47c9b07d2aac3c40799a6448e62'},
  {status: 2, userHash: '4cc207a472ad9b0b4bf882e8133bf242', eventHash: 'f6d06cb6677e99a5f2c42d1fc7ff73ee'},
  {status: 2, userHash: '71c0989f48b5fabe5487617f2506b80a', eventHash: '9848cadc98df4f3eae4ea6a62e2c02ee'},
  {status: 2, userHash: '0bbcef19fc0d9dfb122da12f9520e248', eventHash: '64be58a55aef82f3c3f517e304a3198d'},
  {status: 2, userHash: '1f3384febe0e82413ff01905f82c8ef7', eventHash: '30de54ffc74bb4b2db9b9b84f08ef311'},
  {status: 2, userHash: '1f3384febe0e82413ff01905f82c8ef7', eventHash: '33e6ebb1424cc9ab7042b1de5d998d0b'},
  {status: 2, userHash: 'ecaf1f59bf8ca47c41df101e76c97734', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {status: 2, userHash: 'ecaf1f59bf8ca47c41df101e76c97734', eventHash: 'dac4b47c9b07d2aac3c40799a6448e62'},
  {status: 2, userHash: '07c15306bbfb12f53868aeb9b8aa3fcf', eventHash: 'f6d06cb6677e99a5f2c42d1fc7ff73ee'},
  {status: 2, userHash: '07c15306bbfb12f53868aeb9b8aa3fcf', eventHash: '9848cadc98df4f3eae4ea6a62e2c02ee'},
  {status: 2, userHash: '0b1ddd48205beaf7067b1ea51599daa6', eventHash: '64be58a55aef82f3c3f517e304a3198d'},
  {status: 2, userHash: '0b1ddd48205beaf7067b1ea51599daa6', eventHash: '30de54ffc74bb4b2db9b9b84f08ef311'},
  {status: 2, userHash: '4571e0144d21551ab6ed85ba8d8f3c53', eventHash: '33e6ebb1424cc9ab7042b1de5d998d0b'},
  {status: 2, userHash: '4571e0144d21551ab6ed85ba8d8f3c53', eventHash: '5ad8b2b32c989956438f454b0375d90f'},
  {status: 2, userHash: '168a592b214911fe8a5dcdb776856224', eventHash: 'dac4b47c9b07d2aac3c40799a6448e62'},
  {status: 2, userHash: '2e8a245c471431342dddb090871dfd2c', eventHash: 'f6d06cb6677e99a5f2c42d1fc7ff73ee'},
  {status: 2, userHash: '965b9355546c2f1bd4ddcde6024b4e8c', eventHash: '9848cadc98df4f3eae4ea6a62e2c02ee'},
  {status: 2, userHash: '4517d10a35565b942d5fc92c5a4f9af1', eventHash: '64be58a55aef82f3c3f517e304a3198d'},
  {status: 2, userHash: '965b9355546c2f1bd4ddcde6024b4e8c', eventHash: '64be58a55aef82f3c3f517e304a3198d'}
];

rsvps.forEach(function(rsvp, index) {
  Rsvp
  .find({'rsvp': rsvp.rsvp})
  .where('userHash').equals(rsvp.userHash)
  .where('eventHash').equals(rsvp.eventHash)
  .exec(function(err, rsvps){
    if(!err && !rsvps.length) {
      console.log(rsvp);
      Rsvp.create(rsvp);
    };
  });
});

var Vote = require('./models/vote.js');

// Since Votes require an ID of a topic, we must have a reasonable expectation
//  that the topic seeds have been created. Setting a one second delay is not
//  ideal, but it's the best I know how so far.
setTimeout(function(){
  Topic
  .findOne({'name': 'Food'})
  .where('eventHash').equals('33e6ebb1424cc9ab7042b1de5d998d0b')
  .exec(function(err, topic){
    if(!err && topic) {
      setVoteSeeds(topic['_id']);
    } else {
      console.log('Topic search failed.');
      console.log(err);
      console.log(topics);
    };
  });
}, 1000);

var setVoteSeeds = function(id) {
  var votes = [
    {name: 'Ribs', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Burgers', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Hot Dogs', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Steak', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Kabobs', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Chicken', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Tofu', weight: 1, userHash: '2e8a245c471431342dddb090871dfd2c', topicId: id},
    {name: 'Tofu', weight: 2, userHash: '1f3384febe0e82413ff01905f82c8ef7', topicId: id},
    {name: 'Ribs', weight: 1, userHash: '4571e0144d21551ab6ed85ba8d8f3c53', topicId: id}
  ];

  votes.forEach(function(vote, index) {
    Vote
    .find({'vote': vote.value})
    .where('userHash').equals(vote.userHash)
    //.where('topicHash').equals(vote.eventHash)
    .exec(function(err, votes){
      if(!err && !votes.length) {
        console.log(vote);
        Vote.create(vote);
      };
    });
  });
};

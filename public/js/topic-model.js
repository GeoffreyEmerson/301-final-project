(function(module) {

  function TopicObject(eventHashArg, nameArg, descriptionArg, callback) {
    return this.createTopic(eventHashArg, nameArg, descriptionArg, callback);
  }

  TopicObject.prototype.createTopic = function(eventHashArg, nameArg, descriptionArg, callback) {
    var currentTopic = this;
    $.ajax({
      url: '/api/topics',
      type: 'POST',
      data: {eventHash: eventHashArg, name: nameArg, description: descriptionArg},
      cache: false
    })
    .done( function (data) {
      console.log('Creating new Timing Topic. Returned data:',data);
      currentTopic.name = data.topic.name;
      currentTopic.description = data.topic.description;
      currentTopic.eventHash = data.topic.eventHash;
      currentTopic.id = data.topic._id;
      if (callback) callback(data);
      return currentTopic;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  TopicObject.prototype.rebuildTopicArray = function(eventHashArg, callback) {
    $.ajax({
      url: '/api/topics',
      type: 'GET',
      cache: false
    })
    .done( function (data) {
      var eventTopics = data.topics.filter(function(topic){
        if(topic.eventHash === eventHashArg) return true;
      });
      console.log('Regenerating Topic Array. Returned data:',eventTopics);
      if (callback) callback();
      return eventTopics;
    })
    .fail( function(jqXHR, textStatus, errorThrown) {
      console.warn('Ajax call failed: POST /api/events');
      console.log('jqXHR.responseText:',jqXHR.responseText);
      console.log('textStatus:',textStatus);
      console.log('errorThrown:',errorThrown);
      if (callback) callback();
    });
  };

  //TODO: wtf is the rest of this stuff?

  var wordArr = [];

  function Word(text, usid, topicid) { //TODO: Make sure IIFE enclosure didn't inadvertently break this.
    this.text = text;
    this.weight = 1;
    this.html = {
      'data-usid': usid,
      'data-topicid': topicid,
      'data-votestate': 0,
    };
  };

  module.TopicObject = TopicObject;

})(window);

(function(module) {
  // topicModel = {};
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

  // module.topicModel = topicModel;

})(window);

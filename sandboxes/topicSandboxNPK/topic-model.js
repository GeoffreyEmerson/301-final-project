// Sandbox for jqcloud-sandbox
var wordArr = [];

function Word(text, usid, topicid) {
  this.text = text;
  this.weight = 1;
  this.html = {
    'data-usid': usid,
    'data-topicid': topicid,
    'data-votestate': 0,
  };
};

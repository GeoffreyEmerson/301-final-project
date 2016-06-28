var express = require('express');
var parser = require('body-parser');
var router = require('./api');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));

require('./database');
require('./seed');

app.use(parser.json());
app.use('/api', router);

app.get('*', function(req, res){
  res.sendFile('/public/index.html',{root:__dirname + '/..'});
});

app.listen(app.get('port'), function() {
  console.log('The server is running on port', app.get('port'));
});

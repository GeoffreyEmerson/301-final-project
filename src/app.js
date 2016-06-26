var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/',express.static('public'));

app.listen(app.get('port'), function() {
  console.log('The server is running on port', app.get('port'));
});

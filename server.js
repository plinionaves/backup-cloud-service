var http  = require('http');
var app   = require('./config/express')();
require('./config/database')('mongodb://localhost/backupcloud');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server listening on port ' + app.get('port'));
});

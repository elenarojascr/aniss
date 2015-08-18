var app = require('./app')

// Start the server
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
/**
 * Created by Elena on 2015-08-13.
 */

var app = require('./app')

// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
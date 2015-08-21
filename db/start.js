var mongoose = require('mongoose');
var config = require('../server/config').dbConfig;
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

connect();

// Connect to mongo
function connect() {
    var url = 'mongodb://' + config.username + ':' + config.password + config.address;
    mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}

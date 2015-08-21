var db = require('./db/start');

var RoleSchema = new db.Schema({
    name: String,
    description: String
})

module.exports.RoleModel = db.mongoose.model('Role', RoleSchema);

/*-----------------------------------------------------------------------------*/

var UserSchema = new db.Schema({
    identification: {type:String, unique: true},
    username : {type: String, unique: true},
    email:{type:String, unique:true},
    password : String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    startDate: Date,
    active: Boolean,
    role: { type: ObjectId, ref: 'RoleSchema' }
})

module.exports.UserModel = db.mongoose.model('User', UserSchema);

/*-----------------------------------------------------------------------------*/
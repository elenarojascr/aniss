var db = require('./start');

var RoleSchema = new db.Schema({
    name: String,
    description: String
})

var Role = db.mongoose.model('Role', RoleSchema);

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
    role: { type: db.Schema.Types.ObjectId, ref: 'Role' }
})

var User = db.mongoose.model('User', UserSchema);

/*-----------------------------------------------------------------------------*/

module.exports ={
    RoleModel: Role,
    UserModel: User
}
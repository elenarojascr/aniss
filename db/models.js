var db = require('./start');


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
    role: String
})

var User = db.mongoose.model('User', UserSchema);


module.exports ={
    UserModel: User
}
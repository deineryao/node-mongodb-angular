var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    usrname: {type: String, unique: true},
    email: String,
    color: String,
    hashed_password: String
});

mongoose.model('User', UserSchema);
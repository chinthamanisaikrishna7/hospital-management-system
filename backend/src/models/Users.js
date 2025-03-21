const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : ture,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : ["admin", "receptionist"]
    }
})

const User = mongoose.model('User',UserSchema);

module.exports = User;
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
    },

    connected_users : [{  
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" 
    }]
})

const User = mongoose.model("User",userSchema);

module.exports = User;
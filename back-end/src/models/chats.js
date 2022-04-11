const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema({
    chatroom : {
        type: String,
        unique : true,
        required : true,
    },

    messages : [
        {
         from : {
             type : String,
             required : true
         },
         text : {
             type : String,
             required : true
         },

         date : Date
        }
    ]
});

const Chats = mongoose.model("Chats", chatsSchema);

module.exports = Chats;
const express = require("express");
const socketio = require("socket.io");
const router =require("./routes/chat-route");
require("./connection/connection");
const http = require("http");
const cors = require('cors');
const Chats = require("./models/chats");

const {getChatRoomName} = require("./utils/utility");
const { disconnect } = require("process");
const { json } = require("express");

const PORT = process.env.PORT || 3001;

app = express();
app.use(express.json());
app.use(cors());

app.use(router);
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

var currentUsers = {};

io.on("connection", (socket)=> {
    const username = socket.handshake.auth.username;
    socket.username = username;
    currentUsers[username] = socket.id;

    console.log(socket.username, socket.id);

    socket.on("private-message",(message)=>{

        io.to(currentUsers[message.to]).emit("private-message", message);

        //save the message to databse
        saveToDatabse(message);
    })

    socket.on("disconnect", ()=>{
        //clear User object
        delete currentUsers[socket.username]
        
    })
})



const saveToDatabse = async(message)=> {
    const chatRoomName = getChatRoomName(message.from, message.to);

    var chatRoom = await Chats.findOne({chatroom : chatRoomName});
    if(!chatRoom) {
        //create chat room 
        chatRoom = new Chats({chatroom : chatRoomName});
        await chatRoom.save(); 
    }

    //add message to chatRoom
    chatRoom.messages = [...chatRoom.messages,  {
        from : message.from,
        text : message.text
    }];
    await chatRoom.save();

    
}

server.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT); 
});


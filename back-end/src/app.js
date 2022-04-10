const express = require("express");
const socketio = require("socket.io");
const router =require("./routes/chat-route");
require("./connection/connection");
const http = require("http");
const cors = require('cors');

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
        console.log(message);
        io.to(currentUsers[message.to]).emit("private-message", message);
    })
})


server.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT); 
});


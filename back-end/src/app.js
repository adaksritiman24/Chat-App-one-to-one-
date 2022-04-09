const express = require("express");
const socketio = require("socket.io");
const router =require("./routes/chat-route");

const http = require("http");

const PORT = process.env.PORT || 3001;

app = express();
app.use(router);
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=> {
    console.log("New connection");
    socket.on("send-message",(message)=>{
        console.log(message);
        socket.emit("recv-message", "Server has received your message: "+message);
    })
})


server.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
    
})


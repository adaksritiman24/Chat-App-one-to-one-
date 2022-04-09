const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;

app = express();


const server = http.createServer(app);


server.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
    
})


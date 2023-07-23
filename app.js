const express = require('express')
const { createServer } = require("http")
const { Server } = require("socket.io");
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{}
});

app.get("/",(req,res)=>{
    res.send("welcome")
})

io.on("connection", (socket) => {
    socket.on("joiningReq",(data)=>{
        socket.join(data.roomId)
    })
    socket.on("message",(data)=>{
        io.to(data.roomId).except(socket.id).emit("newMessage",data)
    })
});
  
httpServer.listen(PORT);    
module.exports = app
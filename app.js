import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{}
});

io.on("connection", (socket) => {
    socket.on("joiningReq",(data)=>{
        socket.join(data.roomId)
    })
    socket.on("message",(data)=>{
        io.to(data.roomId).except(socket.id).emit("newMessage",data)
    })
});
 
httpServer.listen(PORT);    
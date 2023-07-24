const { exec } = require("child_process")
const formidable = require("formidable")
const fs = require("fs")
const express = require('express')
const { createServer } = require("http")
const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config()

const PORT = process.env.PORT;
let IP = "localhost"
exec(process.env.IP,(error,stdout,stderr)=>IP = stdout.substring(0,15))


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {}
});

app.get("/images/:name", (req, res) => {
    res.status(200).sendFile(`${__dirname}/public/images/${req.params.name}`)
})



const saveFile = (file) => {
    const date = new Date()
    fs.writeFileSync(`./public/images/${date.toString()}.jpg`, file)
    return `${date}.jpg`;

}

io.on("connection", (socket) => {
    socket.on("joiningReq", (data) => {
        socket.join(data.roomId)
    })
    socket.on("message", (data) => {
        let filename = null
        const msgObj = {}
        if (data.file) {
            filename = saveFile(data.file)
        }
        msgObj.message = data.message
        msgObj.sender = data.sender
        msgObj.image = filename?`http://${IP}:${PORT}/images/${filename}`:null   
        io.to(data.roomId).except(socket.id).emit("newMessage", msgObj)

    })
}); 

httpServer.listen(PORT);
module.exports = app

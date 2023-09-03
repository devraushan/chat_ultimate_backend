const fs = require("fs")
const dotenv = require("dotenv")

dotenv.config()


let IP = process.env.IP
const PORT = process.env.PORT


const saveFile = (file) => {
    const date = new Date()
    fs.writeFileSync(`./public/images/${date.toString()}.jpg`, file)
    return `${date}.jpg`;

}

const chatHandler = (io,socket) => {
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
}


module.exports = chatHandler
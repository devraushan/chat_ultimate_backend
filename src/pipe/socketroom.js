const fs = require("fs")
const MessageDao = require("../db/crud_ops/message_crud")
const UserDao = require("../db/crud_ops/user_crud")
const dotenv = require("dotenv")

dotenv.config()



const url = process.env.BASE_URL

const saveFile = (file) => {
    const date = new Date()
    fs.writeFileSync(`./public/images/${date.toString()}.jpg`, file)
    return `${date}.jpg`;

}

const chatHandler = (io, socket) => {
    socket.on("joiningReq", (data) => {
        socket.join(data.roomId)
    })
    socket.on("message", (data) => {
        let filename = null
        const msgObj = {}
        if (data.file) {
            filename = saveFile(data.file)
        }
        msgObj.sendingTime = data.sendingTime
        msgObj.message = data.message
        msgObj.sender = data.sender
        msgObj.image = filename ? `${url}/images/${filename}` : null
        saveMsg(data.message, filename, data.roomId, data.sender)
        io.to(data.roomId).except(socket.id).emit("newMessage", msgObj)
    })
}

async function saveMsg(content, attatchment, chatId, sender) {
    const user = await UserDao.findByUserName(sender)
    message = { content, attatchment, chatId, sender:user.id }
    MessageDao.create(message)
    }

module.exports = chatHandler
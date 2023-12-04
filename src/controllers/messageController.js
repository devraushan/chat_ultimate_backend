const MessageDao = require("../db/crud_ops/message_crud")

const IP = process.env.IP
const PORT = process.env.PORT

const messageController = {
    fetchMessage
}

async function fetchMessage(req,res){
    const messageList = await MessageDao.findByChatId(req.body.chatId)
    const returnMessage = [];
    messageList.map((msg)=>{
        const clientObj = {
            message : msg.content,
            sender : msg.userName,
            image : msg.attatchment?`http://${IP}:${PORT}/images/${msg.attatchment}` : null
        }
        returnMessage.push(clientObj)
    })
    res.send(returnMessage)
}

module.exports = messageController
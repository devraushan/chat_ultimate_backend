const MessageDao = require("../db/crud_ops/message_crud")

const URL = process.env.BASE_URL

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
            image : msg.attatchment?`${URL}/images/${msg.attatchment}` : null,
            sendingTime : msg.createdAt
        }
        returnMessage.push(clientObj)
    })
    res.send(returnMessage)
}

module.exports = messageController
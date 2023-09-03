const MessageDao = require("../db/crud_ops/message_crud")

messageController = {
    fetchMessage
}

async function fetchMessage(req,res){
    const messageList = await MessageDao.findByChatId(req.body.chatId)
}
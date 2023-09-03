const { Msg } = require("../schema/message_Schema")

const MessageDao = {
    findById,create,findByChatId
}

function findById(id){
    return Msg.findByPk(id)
}
function findByChatId(chatId){
    return Msg.findAll({where: {chatId}})
}
function create(message){
    const msg = new Msg(message)
    return msg.save()
}

module.exports = MessageDao
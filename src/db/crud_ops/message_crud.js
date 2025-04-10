const { Msg } = require("../schema/message_Schema")
const {ChatQuery} = require("../Queries/chatQueries")


const MessageDao = {
    findById,create,findByChatId
}

function findById(id){
    return Msg.findByPk(id)
}
function findByChatId(chatId){
    const getMessagesByChatId = async ()=>{
        const chatList = await ChatQuery.getChats(
            `
            SELECT 
              "Msgs"."content",
              "Msgs"."attatchment",
              "Users"."userName",
              "Msgs"."createdAt"
            FROM "Msgs"
            INNER JOIN "Users"
              ON "Users"."id" = "Msgs"."sender"
            WHERE "Msgs"."chatId" = :chatId
            ORDER BY "Msgs"."createdAt"
            `,
            {chatId}
        )
        return chatList
    }
    return getMessagesByChatId()    
}
function create(message){
    const msg = new Msg(message)
    return msg.save()
}

module.exports = MessageDao
const {Chat} = require("../schema/chat_schema")
const {ChatQuery} = require("../Queries/chatQueries")

const ChatDao = {
    findByMember1,findByMember2,createChat
}

function createChat(chat){
    const newChat = new Chat(chat)
    return newChat.save()
}

function findByMember1(member1){
    const getDetailsByMember1 = async ()=>{
        const temptable = await ChatQuery.getChats("SELECT Users.fName,Users.lName,Users.userName,Users.profilePic, Chats.member1,Chats.member2,Chats.id FROM Chats INNER JOIN Users ON Chats.member1 = Users.id;")
        return temptable
    }
    return getDetailsByMember1()
    // return Chat.findAll({where:{member1}})
}

function findByMember2(member2){
    return Chat.findAll({where:{member2}})
}

module.exports= ChatDao
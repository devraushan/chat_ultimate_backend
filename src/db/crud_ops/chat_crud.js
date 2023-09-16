const {Chat} = require("../schema/chat_schema")
const {ChatQuery} = require("../Queries/chatQueries")
const { QueryTypes } = require("sequelize")

const ChatDao = {
    findByMember1,findByMember2,createChat
}

function createChat(chat){
    const newChat = new Chat(chat)
    return newChat.save()
}

function findByMember1(member1){
    const getDetailsByMember1 = async ()=>{
        const chatList = await ChatQuery.getChats(`SELECT Users.userName,Users.fName,Users.lName,Users.profilePic,Chats.id FROM Users INNER JOIN Chats ON (Chats.member1 = ${member1} AND Chats.member2 = Users.id)`)
        return chatList
    }
    return getDetailsByMember1()
}

function findByMember2(member2){
    const getDetailsByMember2 = async ()=>{
        const chatList = await ChatQuery.getChats(`SELECT Users.userName,Users.fName,Users.lName,Users.profilePic,Chats.id FROM Users INNER JOIN Chats ON (Chats.member2 = ${member2} AND Chats.member1 = Users.id)`)
        return chatList
    }
    return getDetailsByMember2()
}

module.exports= ChatDao
const ChatDao = require("../db/crud_ops/chat_crud")
const UserDao = require("../db/crud_ops/user_crud")
const fs = require("fs")
const path = require("path")


const chatController = {
    createChat,deleteChat,getChats
}

async function createChat(req,res){
    const member1 = req.body.userId
    const member2 = req.body.targetUserId
    const member2Data = await UserDao.findById(member2)
    let existingChat = await ChatDao.findChatByBothMembers(member1,member2)
    if(existingChat){
        const response = constructChatResponse(existingChat,member2Data)
        response.isNew = false
        res.send(response)
        return;
    }
    existingChat = await ChatDao.findChatByBothMembers(member2,member1)
    if(existingChat){
        const response = constructChatResponse(existingChat,member2Data)
        response.isNew = false
        res.send(response)
        return;
    }
    const newChat = await ChatDao.createChat({member1,member2})
    const response = constructChatResponse(newChat,member2Data)
    response.isNew = true;
    res.send(response)
} 

async function deleteChat(){

}

async function getChats(req,res){
    const user = req.body.userId
    const list1 = await ChatDao.findByMember1(user)
    const list2 = await ChatDao.findByMember2(user)
    const list = list1.concat(list2)
    list.map(data=>{
        if(!data.profilePic){
            data.profilePic = fs.readFileSync(path.join(__dirname,"./../../public/icon/7309681.jpg"))
        }
    })
    res.send(list)
}

function constructChatResponse(chat,receiver){
    const chatResponse = {
        id:chat.id,
        fName:receiver.fName,
        lName:receiver.lName,
        userName:receiver.userName,
        profilePic:receiver.profilePic
        
    }
    if(!receiver.profilePic){
        chatResponse.profilePic = fs.readFileSync(path.join(__dirname,"./../../public/icon/7309681.jpg"))
    }
    return chatResponse
}

module.exports = chatController
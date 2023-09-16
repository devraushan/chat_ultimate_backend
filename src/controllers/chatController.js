const ChatDao = require("../db/crud_ops/chat_crud")
const fs = require("fs")
const path = require("path")


const chatController = {
    createChat,deleteChat,getChats
}

async function createChat(req,res){
    const member1 = req.body.userId
    const member2 = req.body.targetUserId
    const newChat = await ChatDao.createChat({member1,member2})
    res.send(newChat)
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

module.exports = chatController
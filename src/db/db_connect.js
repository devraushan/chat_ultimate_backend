const { Sequelize, QueryTypes } = require('sequelize')

const {Chat } = require("../db/schema/chat_schema")
const { User} = require("../db/schema/user_schema")
const UserDao = require('./crud_ops/user_crud');
const { chatSchemaInitialiser } = require('./schema/chat_schema');
const { messageSchemaInitialiser } = require('./schema/message_Schema');
const {userSchemaInitialiser} = require("./schema/user_schema")
const {chatQueryInitialiser} = require("../db/Queries/chatQueries")
const sequelize = new Sequelize('user_bank','devraushan','Raushan2206@',{
    dialect: 'mysql',
    host:"localhost"
})  

const dbconnect = async ()=>{
    sequelize.authenticate().then(()=>console.log("successfully connected")).catch((data)=>console.log(data));
    userSchemaInitialiser(sequelize)
    chatSchemaInitialiser(sequelize)
    messageSchemaInitialiser(sequelize)
    chatQueryInitialiser(sequelize)

    // const temptable = await sequelize.query("SELECT Users.fName,Users.lName,Users.userName,Users.profilePic, Chats.member1,Chats.member2,Chats.id FROM Chats INNER JOIN Users ON Chats.member1 = Users.id;",{ type:QueryTypes.SELECT })
    // console.log(temptable)
}
module.exports= dbconnect
// UserDao.create({
//     fName:"Ross",
//     lName:"rock",
//     userName:"rockrock", 
//     email: "someone@rock.com",
//     phNo:3453642345,
//     country:"IN",
//     hashPass:"jfidskjfwdepojfeovijefupewdjpofie"
// }).then(data=>console.log(data)).catch(err=>console.log(err))
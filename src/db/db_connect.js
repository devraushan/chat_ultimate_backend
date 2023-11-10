const { Sequelize} = require('sequelize')


const { chatSchemaInitialiser } = require('./schema/chat_schema');
const { messageSchemaInitialiser } = require('./schema/message_Schema');
const {userSchemaInitialiser} = require("./schema/user_schema")
const {chatQueryInitialiser} = require("../db/Queries/chatQueries")

const HOST = process.env.DB_HOST
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
const NAME = process.env.DB_NAME

const sequelize = new Sequelize(NAME,USERNAME,PASSWORD,{
    dialect: 'mysql',
    host:HOST
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
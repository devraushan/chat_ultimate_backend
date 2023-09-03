// const UserDao = require("../db/crud_ops/user_crud");



// const userController = {
//     createUser
// }



// function createUser(req,res){
//     const user = {}
//     user.fName = req.body.fName
//     user.lName = req.body.lName
//     user.userName = req.body.userName
//     user.email = req.body.email 
//     user.phNo = req.body.phNo 
//     user.country = req.body.country 
//     user.hashPass = req.body.hashPass
//     user.profilePic  = req.file

//     UserDao.create(user).then(data=>res.send(data)).catch(err=>console.log(err))
    
// }

// function findUserById(req,res){
//     UserDao.findById(req.params.id).then(data=>res.send(data)).catch(err=>res.status(500).send("internal Server Error"))
// }

// // function findUserByUserName(req,res){
// //     UserDao.findByUserName(req.params.userName).then()
// // }

// module.exports = userController
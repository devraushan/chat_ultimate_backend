const UserDao = require("../db/crud_ops/user_crud")

const userBase = {}
userBase.users = []
userBase.updateUserBase = async ()=>{
    const data = await UserDao.findAll({attributes: ['userName','id',"fName","lName"]})
    if(data){
            userBase.users = data.map(rawUser=>{
                return {
                    userName:rawUser.dataValues.userName,
                    id:rawUser.dataValues.id,
                    fName:rawUser.dataValues.fName,
                    lName:rawUser.dataValues.lName
                }
            })
    }

}

module.exports = userBase
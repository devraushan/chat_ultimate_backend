const { User } = require("../schema/user_schema")

const UserDao = {
    findByUserName: findByUserName,
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser
}

function findAll() {
    return User.findAll();
}

function findByUserName(userName) {
    return User.findOne({ where: { userName } });
}

function findById(id) {
    return User.findByPk(id);
}

function deleteById(id) {
    return User.destroy({ where: { id: id } })
}

function updateUser(user, updatee) {
    const updatableUser = {
        fName: user.fName,
        lName: user.lName,
        userName: user.userName,
        email: user.email,
        phNo: user.phNo,
        country: user.country,
        hashPass: user.hashPass,
        profilePic: user.profilePic
    }

    return User.update(updatableUser,{where:{id:updatee}} )
}

function create(user) {
    const newUser = new User(user)
    return newUser.save()
}

module.exports=UserDao

    
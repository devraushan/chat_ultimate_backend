const path = require("path")
const auth = require("../authentication/authinticator")
const UserDao = require("../db/crud_ops/user_crud")
const pass = require("../security/hashingfunc")
const fs = require("fs")
const img = "./../../public/icon/7309681.jpg"

const authController = {
    signUp, login, getProfile, deleteUser, updateUser
}

async function signUp(req, res) {
    console.log(req.file)
    try {

        const user = {}
        user.fName = req.body.fName
        user.lName = req.body.lName
        user.userName = req.body.userName
        user.email = req.body.email
        user.phNo = req.body.phNo
        user.country = req.body.country
        user.hashPass = await pass.hash(req.body.password)
        user.profilePic = req.file ? req.file.buffer : null
        const acknowledgement = await UserDao.create(user)
        let authToken = auth.sign(acknowledgement.id)
        res.send({ authToken })
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }

}

async function login(req, res) {
    try {
        const userName = req.body.userName
        const password = req.body.password
        const user = await UserDao.findByUserName(userName)
        let passwordMatch = null
        if (user) {
            passwordMatch = pass.check(password, user.hashPass)
        }
        if (passwordMatch) {
            let authToken = auth.sign(user.id)
            res.send({ authToken })
        }
        else {
            res.send({error:"wrong Password"})
        }

    } catch (error) {
        res.status(500).send({error:"some error occured"})
        console.log(error)
    }
}

async function getProfile(req, res) {
    try {
        const userId = req.body.userId
        const user = await UserDao.findById(userId)
        if (user) {
            let { fName, lName, country, userName, phNo, profilePic, createdAt, updatedAt, email } = user
            if(!profilePic){
                profilePic = fs.readFileSync(path.join(__dirname,"./../../public/icon/7309681.jpg"))
                
            }
            res.send({ fName, lName, country, userName, phNo, profilePic, createdAt, updatedAt, email })
        }
        else {
            res.status(404).send("User Not Found")
        }
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.body.userId
        const deletedUser = await UserDao.deleteById(userId)
        if (deletedUser) {
            res.send("profile deleted successfully")
        } else res.send("user not found or already deleted")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

async function updateUser(req, res) {
    try {
        const updatedCredential = req.body
        const profilePic = req.file
        const userId = req.body.userId
        const user = await UserDao.findById(userId)
        if (user) {
            const updatedUser = {}
            updatedUser.fName = updatedCredential.fName ? updatedCredential.fName : user.fName
            updatedUser.lName = updatedCredential.lName ? updatedCredential.lName : user.lName
            updatedUser.profilePic = profilePic ? profilePic.buffer : user.profilePic
            updatedUser.email = updatedCredential.email ? updatedCredential.email : user.email
            updatedUser.country = updatedCredential.country ? updatedCredential.country : user.country
            updatedUser.phNo = updatedCredential.phNo ? updatedCredential.phNo : user.phNo
            updatedUser.hashPass = updatedCredential.hashPass ? updatedCredential.hashPass : user.hashPass
            updatedUser.userName = updatedCredential.userName ? updatedCredential.userName : user.userName
            newUser = await UserDao.updateUser(updatedUser, userId)
            if (newUser[0]) res.send("Data has been updated succesfully")
            else res.send("Nothing to Update")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

module.exports = authController
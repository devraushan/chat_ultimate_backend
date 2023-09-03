const jwt = require("jsonwebtoken")

const signature = "Star"

const auth = {
    sign,verify
}

function sign(userId){
   return jwt.sign(userId,signature)
}

function verify(token){
    return jwt.verify(token,signature)
}

module.exports = auth
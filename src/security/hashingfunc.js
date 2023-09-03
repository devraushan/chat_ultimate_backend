const bcrypt =  require("bcrypt")

const pass = {
    hash,check
}

const saltRound = 10;

async function hash(password){
    const hashpass = await bcrypt.hash(password,saltRound)
    return hashpass
}
function check(password,hash){
    const match = bcrypt.compare(password,hash)
    return match
}

module.exports = pass
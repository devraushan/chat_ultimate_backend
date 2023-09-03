const auth = require("../authentication/authinticator")

const validateAuthToken = async (req,res,next)=>{
    try {
        const authToken = req.header("auth-token")
        const userId = auth.verify(authToken)
        req.body.userId = userId
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
    }
}

module.exports = validateAuthToken
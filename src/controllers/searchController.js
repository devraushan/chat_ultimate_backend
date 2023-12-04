const userBase = require("../searchFeature/userBase")

const searchController={
    userSearch
}

async function userSearch(req,res){
    try {
        const {userId} = req.body
        const params = req.query.params.toLowerCase()
        const results = userBase.users.filter(data=>{
            return ((data.userName.toLowerCase().includes(params)||(data.fName+" "+data.lName).toLowerCase().includes(params))&&data.id!=userId)
        })
        res.send({results})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"some Error Occured"})
    }
} 

module.exports = searchController
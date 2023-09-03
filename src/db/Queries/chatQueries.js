
const ChatQuery = {}

const chatQueryInitialiser = (sequelize)=>{
    ChatQuery.getChats = (queryStatement)=>{
        return sequelize.query(queryStatement)
    }
}

module.exports = {ChatQuery,chatQueryInitialiser}
const { QueryTypes } = require("sequelize")

const ChatQuery = {}

const chatQueryInitialiser = (sequelize)=>{
    ChatQuery.getChats = (queryStatement)=>{
        return sequelize.query(queryStatement,{type: QueryTypes.SELECT})
    }
}

module.exports = {ChatQuery,chatQueryInitialiser}
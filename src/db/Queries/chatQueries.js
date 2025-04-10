const { QueryTypes } = require("sequelize")

const ChatQuery = {}

const chatQueryInitialiser = (sequelize)=>{
    ChatQuery.getChats = (queryStatement,variables)=>{
        return sequelize.query(queryStatement,{
            replacements:{...variables},
            type: QueryTypes.SELECT
        })
    }
}

module.exports = {ChatQuery,chatQueryInitialiser}
const { Model, DataTypes } = require("sequelize");
const { Chat } = require("./chat_schema");
const {User} = require("./user_schema")
class Msg extends Model { }
const messageSchemaInitialiser = (sequelize)=>{

    Msg.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content:{
            type: DataTypes.STRING(1000)
        },
        attatchment:{
            type: DataTypes.BLOB("medium")
        },
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Chat,
                key: "id"
            }
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: User,
                key: 'id'
            }
        },
        readStatus:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, { sequelize })

    Msg.sync()   

}    
module.exports={messageSchemaInitialiser,Msg}

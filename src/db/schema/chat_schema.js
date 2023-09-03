const { Model, DataTypes } = require("sequelize");
const {User} = require("./user_schema")
class Chat extends Model { }
const chatSchemaInitialiser = (sequelize)=>{

    Chat.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        member1:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: User,
                key:"id"
            }
            
        },
        member2: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references:{
                model: User,
                key:"id"
            }
        }
    }, { sequelize })

    Chat.sync()

}    
module.exports={chatSchemaInitialiser,Chat}

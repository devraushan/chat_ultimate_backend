const { Model, DataTypes } = require("sequelize");
class User extends Model { }

const userSchemaInitialiser = (sequelize)=>{

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lName: {
            type: DataTypes.STRING,
        },
        profilePic: {
            type: DataTypes.BLOB("medium")
        },
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING
        },
        phNo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },
        country: {
            type: DataTypes.STRING
        },
        hashPass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { sequelize })
    User.sync()

}    
module.exports={userSchemaInitialiser,User}


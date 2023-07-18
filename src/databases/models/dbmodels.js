const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../dbconnection');

class Users extends Model { }
Users.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING
        },
        email: {
            type: new DataTypes.STRING
        },
        employee_code: {
            type: new DataTypes.STRING
        },
        user_type: {
            type: new DataTypes.INTEGER
        },
        password: {
            type: new DataTypes.STRING
        }
    },
    {
        sequelize, // Pass the connection instance
        modelName: "users", // Provide the name of the table
        timestamps: false
    }
);

module.exports = {
    Users
};
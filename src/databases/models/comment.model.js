const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../dbconnection');

class Comment extends Model { }

Comment.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        ticket_id: {
            type: DataTypes.INTEGER
        },
        created_on: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize, // Pass the connection instance
        modelName: "comments", // Provide the name of the table
        timestamps: false
    }
);

module.exports = {
    Comment
};
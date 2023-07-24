const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../dbconnection');

class Attachment extends Model { }

Attachment.init(
    {
        attachment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        ticket_id: {
            type: DataTypes.INTEGER
        },
        created_on: {
            type: DataTypes.DATE
        },
        type: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize, // Pass the connection instance
        modelName: "attachments", // Provide the name of the table
        timestamps: false
    }
);

module.exports = {
    Attachment
};
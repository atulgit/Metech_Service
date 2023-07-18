const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../dbconnection');

class Ticket extends Model { }

Ticket.init(
    {
        ticket_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        project_id: {
            type: DataTypes.INTEGER
        },
        deadline: {
            type: DataTypes.DATE
        },
        date: {
            type: DataTypes.DATE
        },
        type: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize, // Pass the connection instance
        modelName: "tickets", // Provide the name of the table
        timestamps: false
    }
);

module.exports = {
    Ticket
};
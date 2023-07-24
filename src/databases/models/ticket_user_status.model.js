const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../dbconnection');

class TicketUserStatus extends Model { }

TicketUserStatus.init({
    ticket_user_status_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ticket_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    }
}, {

    sequelize, // Pass the connection instance
    modelName: "ticket_user_status_mappings", // Provide the name of the table
    timestamps: false

});

module.exports = {
    TicketUserStatus
}

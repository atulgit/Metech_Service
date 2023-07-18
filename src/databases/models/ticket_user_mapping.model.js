const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../dbconnection');

class TicketUserMappingModel extends Model { }

TicketUserMappingModel.init({
    mapping_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ticket_id: {
        type: DataTypes.INTEGER
    },
    from_user_id: {
        type: DataTypes.INTEGER
    },
    to_user_id: {
        type: DataTypes.INTEGER
    }
}, {

    sequelize, // Pass the connection instance
    modelName: "ticket_user_mapping", // Provide the name of the table
    timestamps: false

});

module.exports = {
    TicketUserMappingModel
}

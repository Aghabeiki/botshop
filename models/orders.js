"use strict";

module.exports = function (sequelize, DataTypes) {
    var Orders = sequelize.define("Orders", {
        location: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        note: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Orders.associate = function (models) {
        Orders.belongsTo(models.Users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Orders;
};
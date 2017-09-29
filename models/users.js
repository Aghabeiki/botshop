"use strict";

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        telegramID: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Users.associate = function (models) {
        Users.hasMany(models.Orders);
    }

    return Users;
};
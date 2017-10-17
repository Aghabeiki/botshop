"use strict";

module.exports = function (sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
        title: {
            type: DataTypes.STRING
        },
        details: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
        promoPrice: {
            type: DataTypes.STRING
        },
        promoLimit:{
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.TEXT
        },
        count: {
            type: DataTypes.INTEGER
        }
    });


    Products.associate = function (models) {
        Products.belongsToMany(models.Orders, {through: 'orders_products'});
        models.Orders.belongsToMany(Products, {through: 'orders_products'});
        Products.belongsTo(models.Categories);
    }

    return Products;
};
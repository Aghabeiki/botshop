/**
 * Created by roten on 9/29/17.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    let Categories = sequelize.define("Categories", {
        name: {
            type: DataTypes.STRING
        },
        details: {
            type: DataTypes.STRING
        }
    });
    Categories.associate = function (models) {
        Categories.hasMany(models.Products);
    }

    return Categories;
};
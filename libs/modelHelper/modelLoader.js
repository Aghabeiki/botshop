/**
 * Created by roten on 9/29/17.
 */
'use strict';

let fs = require('fs');
let path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require('../../config/config.json')[env].db;
let Sequelize = require('sequelize');
let sequelize = require('./db').getInstance(config);
let basepath = path.resolve(__dirname+'/../../models');
let db = {};


fs
    .readdirSync(basepath)
    .filter(file => {
        return (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(basepath, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

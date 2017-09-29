let fs = require('fs');
let path = require('path');
let basename = path.basename(__filename);
let commands = {}


fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var command = require(path.join(__dirname, file));
        commands[file.slice(0, file.length - 3)] = command;
    });

module.exports = commands;

'use strict';
function createInstance(options) {
    const Sequelize = require('sequelize');
    if (options.dialect.toLowerCase() == 'sqlite') {
        const sequelize = new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'sqlite',

            pool: {
                max: options.maxPoll || 5,
                min: 0,
                idle: 10000
            },

            storage: 'database.sqlite'
        });
        return sequelize;
    }
    else if (options.dialect.toLowerCase() == 'mysql') {
        const sequelize = new Sequelize(options.connection.database, options.connection.username, options.connection.password, {
            host: options.connection.host,
            dialect: 'mysql',
            pool: {
                max: options.maxPoll || 5,
                min: 0,
                idle: 10000
            }
        });
        return sequelize;
    }

}
module.exports = (function () {
    let instance;
    return {
        getInstance: function (options) {
            if (!instance) {
                instance = createInstance(options);
            }
            return instance;
        }
    }
})()

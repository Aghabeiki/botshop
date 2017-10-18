#!/usr/bin/env node

'use strict';
const models = require('./libs/modelHelper/modelLoader');
const commands = require('./commands');
const Telegraf = require('telegraf')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const {Router, memorySession} = require('telegraf');

global.bot = new Telegraf(config.bot.token)
global.bot.use(memorySession({ttl: 1024}))
global['_']=require('lodash');

global.bot.telegram.getMe().then((botInfo) => {
    global.bot.options.username = botInfo.username
})

const middleware = new Router((ctx) => {
    if (!ctx.callbackQuery.data) {
        return Promise.resolve()
    }
    const parts = ctx.callbackQuery.data.split('#:#')
    return Promise.resolve({
        route: parts[0],
        state: {
            data: parts[1] || null
        }
    })
})


Object.keys(commands).forEach(Command => {
    switch (commands[Command].action) {
        case 'command':
            global.bot.command(Command.toLowerCase(), commands[Command].body);
            break;
        case 'hears':
            global.bot.hears(commands[Command].patterns, commands[Command].body);
            break;
        case 'middleware':
            middleware.on(commands[Command].patterns, commands[Command].body);
            break;
    }
})

global.bot.on('callback_query', middleware.middleware())
global.bot.on('text', ({replyWithLocation}, next) => {
    if (Math.random() > 0.2) {
        return next()
    }
    return Promise.all([
        replyWithLocation((Math.random() * 180) - 90, (Math.random() * 180) - 90),
        next()
    ])
})
models
    .sequelize
    .sync({force: true})
    .then(() => {
        Object.keys(models).filter(DataModels => {
            return DataModels !== 'sequelize' && DataModels !== 'Sequelize'
        }).forEach(DataModels => {
            "use strict";
            global[DataModels] = models[DataModels];
        })
        require('./libs/bootstrap')
            .then(() => {
                global.bot.startPolling()
                console.log('bot started');
            })
            .catch((err) => {
                console.log(err);
            })

    })


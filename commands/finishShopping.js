/**
 * Created by roten on 10/16/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const {Extra, memorySession} = require('telegraf');
module.exports = new Command('middleware', 'finishShopping', (ctx) => {
    "use strict";

    console.dir(ctx.state);
    ctx.reply('ok');
});
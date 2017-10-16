/**
 * Created by roten on 9/28/17.
 */
"use strict";

let Command = require('../libs/commands/Command');
const {Extra, memorySession} = require('telegraf');
module.exports = new Command('hears', 'Shop', (ctx) => {
    ctx.session.lastState = 'shop'
    Categories
        .findAll()
        .then(categories => {
            const markup = Extra
                .HTML()
                .markup((m) => m.inlineKeyboard(
                    categories.map(cat => {
                        return m.callbackButton(cat.name, 'browsCategory#:#'+JSON.stringify({
                                catID:cat.id
                            }));
                    })
                    , {columns: 3}))
            ctx.reply(`Select the categories please:`, markup)
        })
        .catch((err) => {
            console.log(err);
        })
})

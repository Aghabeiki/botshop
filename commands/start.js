/**
 * Created by roten on 9/28/17.
 */
"use strict";

const Command = require('../libs/commands/Command');
module.exports = new Command('command', (ctx) => {
    //ctx.session.value = 0
    Users
        .findAll({
            where: {
                telegramID: ctx.from.id
            }
        })
        .then((users) => {
            if (users.length == 1) {
                // if yes : show the main menu
            }
            else {
                ctx.reply("Hello " + ctx.from.first_name + ", Welcome to " + bot.options.username
                    , require('../keybords/MainMenu'))
            }
        })
        .catch((err) => {
            console.log(err);
        })
});



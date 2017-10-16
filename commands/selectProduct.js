/**
 * Created by roten on 10/11/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const totalProductsInBrowsingPage = 12;
const {Extra, memorySession} = require('telegraf');
module.exports = new Command('middleware', 'selectProduct', (ctx) => {
    "use strict";
    ctx.session.lastState = 'selectProduct';
    Products.findById(ctx.state.data)
        .then(product => {
            const markup = Extra
                .HTML()
                .markup((m) => m.inlineKeyboard([
                        m.callbackButton("Order", `orderProduct#:#${ctx.state.data}`), m.callbackButton("Back", 'browsCategory#:#return')]
                    , {columns: 2}));
            let messageBody = (`${product.title}\n\r` ) +
            `Price: ${product.price}\n\r` +
            product.count == 0 ? `out of stock\n\r` : `in stock : ${product.count} left\n\r`;
            if (product.image == undefined || product.image == null) {
                // send res by text only
                ctx.editMessageText(messageBody, markup)
                    .then(() => undefined)
                    .catch(console.log);
            }
            else {
                /*
                 image
                 title + price count
                 */
                markup.caption = messageBody;
                ctx.deleteMessage().then(() => {
                    ctx
                        .replyWithPhoto({source: require('../libs/utils/image64').decodeImage(product.image).buffer}, markup)
                        .then(() => undefined)
                        .catch(console.trace);
                }).catch((err) => {
                    console.trace(err);

                });

            }

        })
        .catch(console.trace);


});
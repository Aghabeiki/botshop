/**
 * Created by roten on 10/11/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const totalProductsInBrowsingPage = 12;
const { Extra, memorySession } = require('telegraf');
module.exports = new Command('middleware', 'selectProduct', (ctx) => {
    "use strict";
    let productID = -1;
    if (ctx.session.lastState !== 'selectProduct') {
        ctx.session.lastState = 'selectProduct';
        ctx.session.selectedProduct = {
            id: ctx.state.data,
            count: 1
        }
        productID = ctx.state.data;
    }
    else {
        // inc and dec the count 
        if (ctx.state.data == 'mine')
            ctx.session.selectedProduct.count--;
        else
            ctx.session.selectedProduct.count++;

        productID = ctx.session.selectedProduct.id;
    }

    Products.findById(productID)
        .then(product => {
            const markup = Extra
                .HTML()
                .markup((m) => m.inlineKeyboard(
                    [
                        [m.callbackButton("-1", `selectProduct#:#mine`), m.callbackButton("+1", `selectProduct#:#plus`)],
                        [m.callbackButton(`Order ${ctx.session.selectedProduct.count} pc(s)`, `orderProduct#:#order`), m.callbackButton("Back", 'browsCategory#:#return')]
                    ], { columns: 2 }));
            let messageBody = (`${product.title}\n\r`) +
                `Price: ${product.price}\n\r` +
                product.count == 0 ? `out of stock\n\r` : `in stock\n\r`;
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
                        .replyWithPhoto({ source: require('../libs/utils/image64').decodeImage(product.image).buffer }, markup)
                        .then(() => undefined)
                        .catch(console.trace);
                }).catch((err) => {
                    console.trace(err);

                });

            }

        })
        .catch(console.trace);


});
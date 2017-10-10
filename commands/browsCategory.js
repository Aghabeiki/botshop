/**
 * Created by roten on 9/29/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const {Extra, memorySession} = require('telegraf');
module.exports = new Command('middleware', 'browsCategory', (ctx) => {
    if (ctx.session.state == 'shop') {
        Categories
            .findById(JSON.parse(ctx.state.data).catID)
            .then(category => {
                category.getProducts()
                    .then(products => {
                        "use strict";

                        ctx.session.state = 'browsCategory';
                        ctx.session.pagination = 0;
                        ctx.session.maxPage = products.length - 1;
                        const markup = Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                    [m.callbackButton("Back", 'browsCategory#:#back'),
                                        m.callbackButton("Next", 'browsCategory#:#next')],
                                    [m.callbackButton("Order", 'browsCategory#:#order')]
                                ]
                                , {columns: 2}))
                        let product = products[ctx.session.pagination];
                        let messageBody = (`${product.title}\n\r` ) +
                        `Price: ${product.price}\n\r` +
                        product.count == 0 ? `out of stock\n\r` : `in stock : ${product.count} left\n\r`;
                        if (product.image == undefined || product.image == null) {
                            // send res by text only
                            ctx.reply(messageBody, markup)
                                .then(() => undefined)
                                .catch(console.log);
                        }
                        else {
                            /*
                             image
                             title + price count
                             */
                            markup.caption = messageBody;
                            ctx
                                .replyWithPhoto({source: require('../libs/utils/image64').decodeImage(product.image).buffer}, markup)
                                .then(() => undefined)
                                .catch(console.log);
                        }
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        ctx.reply("fuck baba");
    }

})

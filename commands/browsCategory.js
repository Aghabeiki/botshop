/**
 * Created by roten on 9/29/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const {Extra, memorySession} = require('telegraf');
module.exports = new Command('middleware', 'browsCategory', (ctx) => {
    //ctx.session.value = 0
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
                            .HTML('hello')
                            .markup((m) => m.inlineKeyboard([
                                    m.callbackButton("Back", 'browsCategory#:#back'),
                                    m.callbackButton("Next", 'browsCategory#:#next')
                                ]
                                , {columns: 2}))

                        const base64Img = require('base64-img');
                        const crypto = require('crypto');

                        let name = crypto.createHash('md5').update(new Date().toUTCString()).digest("hex");
                        let image = base64Img.imgSync(products[0].image, './tmp/', name);
                        ctx
                            .replyWithPhoto({source: require('path').resolve(__dirname, '../' + image)}, markup)
                            .then(() => undefined)
                            .catch((err) => {
                                console.log(err)
                            });

                        /*
                         image
                         title + price count
                         */
                        /*let product = products[ctx.session.pagination];
                         let messageBody = (`<b>${product.title}</b>` ) +
                         ( product.image !== null && products.image !== undefined ? `<imgage src="${product.image}"></imgage>` : ``) +

                         `<b>Price: ${product.price}</b>` +
                         `<b>Available : ${product.count !== 0}</b>`;

                         ctx.editMessageReplyMarkup(messageBody, markup).catch((err) => {
                         console.log(err)
                         });*/

                    })
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        ctx.reply("fuck baba");
    }

})

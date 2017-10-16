/**
 * Created by roten on 9/29/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const totalProductsInBrowsingPage = 12;
const {Extra, memorySession} = require('telegraf');

const showCate = function (ctx) {
    Categories
        .findById(ctx.session.state.browsCat.id)
        .then(category => {
            category.getProducts()
                .then(products => {
                    "use strict";
                    let keyboards = {};
                    if (products.length > totalProductsInBrowsingPage) {
                        // should enable pagination
                        ctx.session.pagination = 0;
                        ctx.session.maxPage = products.length - 1;
                        // todo not implemented
                    }
                    else {
                        // should not enable pagination
                        products.forEach(product => {
                            keyboards[product.title] = 'selectProduct#:#' + product.id;
                        })
                    }
                    const markup = Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard((Object.keys(keyboards).reduce((p, v, i, arr) => {
                                    p[0].push(m.callbackButton(v, keyboards[v]))
                                    if (i === arr.length - 1 && ctx.session.pagination !== undefined) {
                                        // remove the back and next btn if the products less then the total
                                        p[1].push(m.callbackButton("Back", 'browsCategory#:#back'));
                                        p[1].push(m.callbackButton("Next", 'browsCategory#:#next'));
                                    }
                                    return p;
                                }, [
                                    [],// products
                                    []// back and forward
                                ])// reduce end
                            )// end
                            , {columns: products.length > 12 ? 4 : products.length > 6 ? 3 : 2}))

                    ctx.editMessageText(`total products in <b>${category.name}</b> is ${products.length} `, markup)
                        .then(() => undefined)
                        .catch((err) => {
                            console.trace((err));
                            ctx.reply(`total products in <b>${category.name}</b> is ${products.length} `, markup)
                                .then(() => undefined)
                                .catch(console.trace);
                        });
                })
                .catch(console.trace);
        })
        .catch(console.trace)
}
module.exports = new Command('middleware', 'browsCategory', (ctx) => {
    if (ctx.session.lastState == 'shop') {
        ctx.session.state = {}
        ctx.session.state.browsCat = {
            id: JSON.parse(ctx.state.data).catID
        }
        ctx.session.lastState = 'browsCategory';
        showCate(ctx);
    }
    else if (ctx.session.lastState == 'selectProduct') {
        if (ctx.state.data == 'return') {
            // request back to brows products
            ctx.deleteMessage()
                .then(() => {
                    "use strict";
                    showCate(ctx);
                })
                .catch(console.trace);
        }
    }
})

/**
 * Created by roten on 10/11/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const async = require('async');
const { Extra, memorySession } = require('telegraf');
module.exports = new Command('middleware', 'orderProduct', (ctx) => {
    "use strict";
    if (ctx.session.lastState == 'selectProduct') {
        ctx.session.lastState = 'orderProduct';
        const selectProduct = _.cloneDeep(ctx.session.selectedProduct);
        console.dir(ctx.session.selectedProduct)
        delete ctx.session.selectedProduct;
        // should show end shopping
        // or add to carts

        async.waterfall([
            (done) => {
                Products.findById(selectProduct.id)
                    .then((product) => {
                        done(null, product);
                    })
                    .catch((err) => {
                        done(err)
                    })
            },
            (product, done) => {
                // add to user cart list
                if (ctx.session.cart == undefined)
                    ctx.session.cart = [];
                ctx.session.cart.push(selectProduct)
                ctx.deleteMessage()
                    .then(() => {
                        done(null, product)
                    })
                    .catch((err) => {
                        done(err);
                    })

            },
            (product, done) => {
                const markup = Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton("finish shopping", `finishShopping#:#${JSON.stringify(ctx.session.cart)}`),
                        m.callbackButton("continue shopping", `browsCategory#:#${product.CategoryId}`)
                    ]
                        , { columns: 2 }));

                ctx.reply(`The '${product.title}' added to your carts.`, markup)
                    .then(() => {
                        done()
                    })
                    .catch((err) => {
                        done(err)
                    });
            }

        ], (err, results) => {
            if (err) {
                console.trace((err));
            }

        })
    }
    else {
        ctx.reply("fuck baba!");
    }


})
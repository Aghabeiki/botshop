/**
 * Created by roten on 10/16/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
let text2png = require('text2png');
const { Extra, memorySession } = require('telegraf');
module.exports = new Command('middleware', 'finishShopping', (ctx) => {
    "use strict";
    // check the item list is available 
    // if available check the required user information for order is valid 
    // if information is valid place the order
    if (ctx.session.lastState === 'orderProduct') {
        ctx.session.lastState = 'finishShopping';
        let selectedProducts = JSON.parse(ctx.state.data);
        Products.findAll({
            where: {
                id: selectedProducts.map(prod => { return prod.id })
            }
        })
            .then((products) => {
                if (products.length == selectedProducts.length) {
                    let orderedData = selectedProducts.map(function (element) {
                        let product = products.filter(prod => { return prod.id == element.id })[0]

                        let price = 0;
                        if (product.promoPrice != null) {
                            if (product.promoLimit !== null) {
                                if (element.count >= product.promoLimit)
                                    price = product.promoPrice
                            }
                            else {
                                price = product.promoPrice
                            }
                        }
                        else {
                            price = product.price;
                        }
                        return {
                            title: product.title,
                            count: element.count,
                            correct: product.count - element.count,
                            id: element.id,
                            price: price
                        }
                    });
                    var Table = require('cli-table');
                    var table = new Table({
                        head: ['#', 'name', 'count', 'price']
                        , colWidths: [10, 20]
                    });
                    
                   
                    let image = text2png(table.toString(), {
                        font: '80px Futura',
                        textColor: 'teal',
                        bgColor: 'linen',
                        lineSpacing: 10,
                        padding: 20,
                        output: 'buffer'
                    });
                    require('fs').writeFileSync('./test.png',image);
                    const markup = Extra
                        .HTML()
                        .markup((m) => m.inlineKeyboard([
                            m.callbackButton('Confirm', `finishShopping#:#confirm`),
                            m.callbackButton('Edit', `finishShopping#:#edit`)
                        ]
                            , { columns: 2 }));

                    markup.caption = `Your order list\n  Total Price <b>${orderedData.reduce((sum, order) => {
                        sum += order.count * order.price
                        return sum;
                    }, 0)}</b>`
                    ctx.replyWithPhoto({ source: image }, markup)
                        .then(() => undefined)
                        .catch(console.trace);

                }
                else {
                    ctx.reply('fuck baba!');
                }

            })
            .catch((err) => {
                console.trace(err);
                ctx.reply('ok');
            })
    }
    else {
        ctx.reply(ctx.state.data);
    }
});
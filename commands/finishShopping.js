/**
 * Created by roten on 10/16/17.
 */

let Command = require('../libs/commands/Command');
let image64 = require('../libs/utils/image64');
const { Extra, memorySession } = require('telegraf');
module.exports = new Command('middleware', 'finishShopping', (ctx) => {
    "use strict";
    // check the item list is available 
    // if available check the required user information for order is valid 
    // if information is valid place the order
    let selectedProducts = JSON.parse(ctx.state.data);
    Products.findAll({
        where: {
            id: selectedProducts.map(prod => { return prod.id })
        }
    })
        .then((products) => {
            console.dir(products)
            ctx.reply('ok');
        })
        .catch((err) => {
            ctx.reply('ok');
        })
});
/**
 * Created by roten on 9/28/17.
 */
"use strict";

const {Extra, Markup} = require('telegraf');
module.exports = Markup
    .keyboard([['Shop', 'Setting'], ['Orders', 'About']])
    .oneTime()
    .resize()
    .extra()
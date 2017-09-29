/**
 * Created by roten on 9/29/17.
 */

let bootstrap = require('../../config/bootstrap')
module.exports = (function () {
    "use strict";
    return Promise.all(Object.keys(bootstrap).map(keys => {
        return bootstrap[keys]();
    }));
})()
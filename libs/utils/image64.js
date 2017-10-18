/**
 * Created by roten on 9/29/17.
 */


let image64 = {
    decodeImage: function (data) {
        "use strict";
        var reg = /^data:image\/(\w+);base64,([\s\S]+)/;
        var match = data.match(reg);
        var baseType = {
            jpeg: 'jpg'
        };

        if (!match) {
            throw new Error('image base64 data error');
        }

        var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

        return {
            extname: '.' + extname,
            buffer: Buffer.from(match[2], 'base64')
        };
    },
    encodeImage:function(data){
        const imageType = require('image-type');
        return "data:" + imageType(data).mime + ";base64,"+data.toString('base64')
    },
    bufferToStream: function (buffer) {
        let Duplex = require('stream').Duplex;
        let stream = new Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;

    }

}


module.exports = image64;
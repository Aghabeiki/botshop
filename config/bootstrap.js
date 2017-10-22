/**
 * Created by roten on 9/29/17.
 */
let text2png = require('text2png');
let encodeImage = require('../libs/utils/image64').encodeImage
module.exports = {
    insertCategoriesAndProducts: function () {
        "use strict";
        let cats = [
            {
                name: 'cat2',
                details: 'details',
                Products: [
                    {
                        title: 'product1',
                        details: 'prod 1 details',
                        image: encodeImage(text2png('product1\nProd 1 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 100,
                        promoPrice: 50,
                        promoLimit: 30,
                        count: 100
                    },
                    {
                        title: 'product2',
                        details: 'prod 2 details',
                        image: encodeImage(text2png('product2\nProd 2 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 10,
                        promoPrice: 5,
                        promoLimit: 10,
                        count: 20
                    },
                    {
                        title: 'product3',
                        details: 'prod 3 details',
                        image: encodeImage(text2png('product3\nProd 3 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 20,
                        promoPrice: 18,
                        promoLimit: 1,
                        count: 5
                    }]
            },
            {
                name: 'cat3',
                details: 'details',
                Products: [
                    {
                        title: 'product1',
                        details: 'prod 1 details',
                        image: encodeImage(text2png('product1\nProd 1 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 100,
                        promoPrice: 50,
                        promoLimit: 30,
                        count: 100
                    },
                    {
                        title: 'product2',
                        details: 'prod 2 details',
                        image: encodeImage(text2png('product2\nProd 2 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 10,
                        promoPrice: 5,
                        promoLimit: 10,
                        count: 20
                    },
                    {
                        title: 'product3',
                        details: 'prod 3 details',
                        image: encodeImage(text2png('product3\nProd 3 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 20,
                        promoPrice: 18,
                        promoLimit: 1,
                        count: 5
                    }]
            },
            {
                name: 'cat1',
                details: 'details',
                Products: [
                    {
                        title: 'product1',
                        details: 'prod 1 details',
                        image: encodeImage(text2png('product1\nProd 1 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 100,
                        promoPrice: 50,
                        promoLimit: 30,
                        count: 100
                    },
                    {
                        title: 'product2',
                        details: 'prod 2 details',
                        image: encodeImage(text2png('product2\nProd 2 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 10,
                        promoPrice: 5,
                        promoLimit: 10,
                        count: 20
                    },
                    {
                        title: 'product3',
                        details: 'prod 3 details',
                        image: encodeImage(text2png('product3\nProd 3 details', {
                            font: '80px Futura',
                            textColor: 'teal',
                            bgColor: 'linen',
                            lineSpacing: 10,
                            padding: 20,
                            output: 'buffer'
                        })),
                        price: 20,
                        promoPrice: 18,
                        promoLimit: 1,
                        count: 5
                    }]
            }];
        return Promise.all(cats.map(cat => {
            return Categories.create(cat, { include: [Products] })
        }));


    }
}
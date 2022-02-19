var core = require('./../Core');
var dataCache = require('./../data/Cache/dataCache');
var products = require('./../data/Products/products');

var adminBussiness = {
    getProducts: function(cb){
        products.getproducts(function(result){
            cb && cb(result);
        });
    }
};

module.exports = adminBussiness;
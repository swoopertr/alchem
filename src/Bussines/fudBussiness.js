const core = require('../Core');
var productData = require('./../Data/Products/products');
var fudData = require('./../Data/Fud/fud');
var dataCache = require('./../Data/Cache/dataCache');

var fudBussiness = {
    fuds: function(cb){
        fudData.getAll(function(result){
            cb && cb(result);
        });
    },
    products: function(cb){
        productData.getproducts(function(result){
            cb && cb(result);
        });
    }
};

module.exports = fudBussiness;
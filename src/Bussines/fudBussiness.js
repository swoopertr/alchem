const core = require('../Core');
var RaM  = require('./../data/ExternalApi/RickAndMorty');
var productData = require('./../data/Products/products');
var fudData = require('./../data/Fud/fud');
var dataCache = require('./../data/Cache/dataCache');

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
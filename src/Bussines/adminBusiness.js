var core = require('./../Core');
var dataCache = require('./../Data/Cache/dataCache');
var products = require('./../Data/Products/products');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');

var adminBussiness = {
    getProducts: function(cb){
        products.getproducts(function(result){
            cb && cb(result);
        });
    },
    getPharmacyList: function(cb){
        pharmacyData.getPharmacies(function(result){
            cb && cb(result);
        });
    }
};

module.exports = adminBussiness;
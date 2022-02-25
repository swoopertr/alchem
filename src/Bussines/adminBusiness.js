var core = require('./../Core');
var dataCache = require('./../Data/Cache/dataCache');
var products = require('./../Data/Products/products');
var users = require('./../Data/Users/users');

var adminBussiness = {
    getProducts: function(cb){
        products.getproducts(function(result){
            cb && cb(result);
        });
    }, 
    addFud: function(fud_obj, cb){
        users.insertUser(fud_obj, function(result){
            cb && cb(result);
        });
    }
};

module.exports = adminBussiness;
var core = require('./../Core');
var dataCache = require('./../Data/Cache/dataCache');
var products = require('./../Data/Products/products');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');
var goalsData = require('./../Data/Goals/goals');

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
    },
    getAllGoals : function(cb, cbErr){
        goalsData.getGoals(function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    },
    getAvailableGoals : function(cb, cbErr){
        goalsData.getAllAppointedGoals(function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    }
};

module.exports = adminBussiness;
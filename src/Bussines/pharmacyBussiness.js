const core = require('../Core');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');

var pharmacyBusiness = {
    getAllPharmacies: function (cb) {
        pharmacyData.getPharmacies(function (result) {
            cb && cb(result);
        });
    }
}

module.exports = pharmacyBusiness;
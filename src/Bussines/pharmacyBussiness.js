const core = require('../Core');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');

var pharmacyBusiness = {
    getAllPharmacies: function (cb) {
        pharmacyData.getPharmacies(function (result) {
            cb && cb(result);
        });
    },
    getPharmacyById:function(id, cb){
        pharmacyData.getPharmacyById(id, function(result){
            cb && cb(result);
        });
    },
    deletePharmacy: function (id, cb) {
        pharmacyData.deletePharmacy(id, function (result) {
            cb && cb(result);
        });
    }
}

module.exports = pharmacyBusiness;
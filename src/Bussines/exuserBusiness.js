const core = require('../Core');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');


let pharmacyBusiness = {
    login: function(email, pass, cb){
        pharmacyData.getPharmacyByEmailPassword(email, pass, function(result){
            cb && cb(result);
        });
    }
};

module.exports = pharmacyBusiness;
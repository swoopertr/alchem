var pharmacyData = require('./../Data/Pharmacy/pharmacy');
var technicianData = require('./../Data/Technician/technician');

var technicianBusiness = {
    getAll: function(cb){
        technicianData.getAll(function (result) {
            cb && cb(result);
        });
    },
    getPharmacyId: function(PharmacyId, cb){
        technicianData.getByPharmacyId(PharmacyId, function (result) {
            cb && cb(result);
        });
    }
};

module.exports = technicianBusiness;
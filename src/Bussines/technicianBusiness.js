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
    },
    getOne : function(id, cb){
        technicianData.getOne(id, function(result){
            cb && cb(result);
        });
    },
    upsert: function(data, cb){
        if(data.Id == 0){
            technicianData.insert(data, function (result) {
                cb && cb(result);
            });
        }else{
            technicianData.update(data, function (result) {
                cb && cb(result);
            });
        }
    }
};

module.exports = technicianBusiness;
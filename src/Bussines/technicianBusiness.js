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
    },
    delete : function(data, cb){
        technicianData.delete(data, function(result){
            cb && cb(result);
        });
    },
    async : {
        getPharmacyId : function(PharmacyId){
            return new Promise((resolve, reject)=>{
                technicianBusiness.getPharmacyId(PharmacyId, function(result){
                    resolve(result);
                });
            });
        }
    }
};

module.exports = technicianBusiness;
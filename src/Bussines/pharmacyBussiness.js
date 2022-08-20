const core = require('../Core');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');
var email_helper = require('./../Helper/mailHelper');

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
    getPharmacyByIdAsync: function(id){
        return new Promise((resolve, reject) =>{
            pharmacyBusiness.getPharmacyById(id, function(result){
                resolve(result);
            });
        })
    },
    deletePharmacy: function (id, cb) {
        pharmacyData.deletePharmacy(id, function (result) {
            cb && cb(result);
        });
    },
    updatePharmacy: function (data, cb) {
        pharmacyData.updatePharmacy(data, function (result) {
            cb && cb(result);
        });
    },
    sendPharmacyPasswordMail : function(email, password, cb){
        email_helper.send_mail(email, "Eczane Teknisyeni Şifresi", "Şifreniz : " + password, function(result){
            cb && cb(result);
        });
    }
}

module.exports = pharmacyBusiness;
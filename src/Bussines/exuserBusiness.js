const core = require('../Core');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');

let pharmacyBusiness = {
    login: function(email, pass, cb){
        pharmacyData.getPharmacyByEmailPassword(email, pass, function(result){
            let token  = core.GenerateToken();
            let data = {};
            if(result.length != 0){
                data = result[0];
                data.token = token;
            }
            pharmacyData.updateToken(data, function(result){   
                cb && cb(data);
            });
        });
    },
    checkToken: function(token, cb){
        cb(true);
    }
};

module.exports = pharmacyBusiness;
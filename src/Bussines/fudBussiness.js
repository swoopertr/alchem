const core = require('../Core');
var productData = require('./../Data/Products/products');
var fudData = require('./../Data/Fud/fud');
var checkInData = require('./../Data/Checkin/checkin');
var mail_helper = require('./../Helper/mailHelper');


var fudBussiness = {
    fudById: function(id, cb){
        fudData.getById(id, cb);
    },
    fuds: function(cb){
        fudData.getAll(function(result){
            cb && cb(result);
        });
    },
    products: function(cb){
        productData.getproducts(function(result){
            cb && cb(result);
        });
    },
    addFud: function(fud_obj, cb){
        fudData.insertUser(fud_obj, function(result){
            cb && cb(result);
        });
    },
    updateFud: function(fud_obj, cb){
        fudData.updateUser(fud_obj, function(result){
            cb && cb(result);
        });
    },
    addPharmacy : function(fud_obj, cb){
        fud_obj.password = core.GeneratePassword();
        fudData.addPharmacy(fud_obj, async function(result){
            if(result>0){
               await mail_helper.send_mail_async(fud_obj.email, 'Eczane Teknisyen şifreniz', 'Alchemlife Eğitim sistemine hoş geldiniz. Şifreniz : ' +fud_obj.password);
            }
            cb && cb(result);
        });
    },
    checkin : function(checkin, cb){
        checkInData.saveCheckin(checkin, function(result){
            cb && cb(result);
        });
    },
    getCheckin : function(userId, cb){
        checkInData.getCheckin(userId, function(result){
            cb && cb(result);
        });
    }
    
};

module.exports = fudBussiness;
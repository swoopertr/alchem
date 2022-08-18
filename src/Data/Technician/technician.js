var pg = require('../Repository/postgre');

var technician_work = {
    getAll :function(cb, cbErr) {
        let query = {
            text: `SELECT * FROM public."Technician";`,
            values: []
        };
       
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getByPharmacyId : function(PharmacyId, cb, cbErr){
        let query = {
            text: `SELECT * FROM public."Technician" where "PharmacyId" = $1;`,
            values: [PharmacyId]
        };
       
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async:{
        getAll : function () {
            return new Promise(function (resolve, reject) {
                technician_work.getAll(function (result) {
                    resolve(result);
                },
                function (err) {
                    reject(err);
                });
            });
        },
        getByPharmacyId: function(PharmacyId){
            return new Promise(function (resolve, reject) {
                technician_work.getByPharmacyId(PharmacyId, function (result) {
                    resolve(result);
                },
                function (err) {
                    reject(err);
                });
            });
        }
    }
};
module.exports = technician_work;
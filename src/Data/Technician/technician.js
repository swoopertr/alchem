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
    getOne : function(id, cb, cbErr){
        let query = {
            text: `SELECT * FROM public."Technician" where "Id" = $1;`,
            values: [id]
        };
       
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    insert : function(data, cb, cbErr){
        let query = {
            text : `INSERT INTO public."Technician"("Email", "Name", "Phone", "Status", "CreatedAt", "PharmacyId")
                                            VALUES ($1,      $2,     $3,      $4,       now(),       $5);`,
            values: [data.email, data.nameSurName, data.phone, data.status, data.PharmacyId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    update: function(data, cb, cbErr){
        let query = {
            text : `UPDATE public."Technician" SET "Email"=$2, "Name"=$3, "Phone"=$4, "Status"=$5, "PharmacyId"=$6 WHERE "Id"=$1`,
            values: [data.Id, data.email, data.nameSurName, data.phone, data.status, data.PharmacyId]
        };

        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    delete: function(data, cb,cbErr){
        let query = {
            text : `UPDATE public."Technician" SET "Status"=3, WHERE "Id"=$1`,
            values: [data.Id]
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
        },
        getOne: function(id){
            return new Promise(function (resolve, reject) {
                technician_work.getOne(id, function (result) {
                    resolve(result);
                },
                function (err) {
                    reject(err);
                });
            });
        },
        insert : function(data){
            return new Promise(function (resolve, reject) {
                technician_work.insert(data, function (result) {
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
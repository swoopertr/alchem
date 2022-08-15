var pg = require('./../Repository/postgre');


var workDefinition = {
    getPharmacyByEmailPassword : function (email, password, cb) {
        const query = {
            text: 'select * from public."Pharmacies" where "email" = $1 and "Password" = $2 and "Status" = 1',
            values: [email, password]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getPharmacies: function (cb, cbErr) {
        const query = {
            text: 'select p.*, u."Name" fud_name from public."Pharmacies" p left outer join "Users" u on (p.fudid = u."Id")',
            values: []
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getPharmacyById: function (id, cb, cbErr) {
        const query = {
            text: 'select * from public."Pharmacies" where "Id" = $1',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    deletePharmacy: function (id, cb) {
        const query = {
            text: 'update public."Pharmacies" set "Status"=3 where "Id"=$1;',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    getPharmacyByToken: function (token, cb, cbErr) {
        const query = {
            text: 'select * from public."Pharmacies" where "token" = $1',
            values: [token]
        };
        pg.query(query, function (result) {
            if (result.length == 0) {
                cb && cb(false);
                return;
            }
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    updatePharmacy: function (data, cb) {
        const query = {
            text: `update "Pharmacies"
            set "Name" = $2,
                "Status"=$3,
                "email" = $4,
                "Phone"=$5,
                "CellPhone"= $6,
                "City"= $7,
                "Contact" = $8,
                "Country" = $9,
                "glncode" = $10,
                "Town"= $11,
                "lng" = $12,
                "lat" = $13,
                "isChecked"= $14,
                "Adress"= $15,
                "Password"= $16,
                "technician"=$17
                where "Id" = $1;`,
            values: [data.Id, data.pharmacyName, data.status, data.email, data.officePhone, data.gsm, data.city, data.nameSurname, data.country, data.glncode,
                data.town, data.lng, data.lat, data.isChecked, data.adress, data.password, data.technician]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    updateToken : function(data, cb){
        const query = {
            text: `update "Pharmacies" set "token" = $2 where "Id" = $1;`,
            values: [data.Id, data.token]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    async: { // async versions of the above functions
     
    }
};

module.exports = workDefinition;
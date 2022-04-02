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
            text: 'select * from public."Pharmacies" ',
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
                "Street" = $12,
                "lng" = $13,
                "lat" = $14,
                "isChecked"= $15,
                "Quarter"= $16
                where "Id" = $1;`,
            values: [data.Id, data.pharmacyName, data.status, data.email, data.officePhone, data.gsm, data.city, data.nameSurname, data.country, data.glncode,
                data.town, data.street, data.lng, data.lat, data.isChecked, data.Quarter]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    updateToken : function(data, cb){
        const query = {
            text: `update "Pharmacies" set "token" = $2 where "Id" = $1;`,
            values: [data.Id, data.Token]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    async: { // async versions of the above functions
     
    }
};

module.exports = workDefinition;
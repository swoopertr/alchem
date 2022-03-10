var pg = require('./../Repository/postgre');


var workDefinition = {
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
  
    async: { // async versions of the above functions
     
    }
};

module.exports = workDefinition;
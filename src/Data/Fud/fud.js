var pg =  require('../Repository/postgre');

var workDefinition = {
    getAll: function(cb, cbErr){
        const query = { // change the query
            text: 'SELECT * FROM public."Users" where "Type" = 2',
            values: [],
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getUsernameAndPassword: function(username, password, cb){
        const query = { 
            text: 'SELECT * FROM public."Users" WHERE email = $1 AND password = $2',
            values: [username, password]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    getById: function(id, cb){
        const query = {
            text: 'select * from public."Users" where "Id" =$1;',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    insertUser: function(user, cb){
        const query = { 
            text: `INSERT INTO public."Users" ("Name", "Type", "Status", email, password, "lastLogin", token, token_exp, "PhoneNumber") 
                VALUES ($1, 2, 1, $2, $3, null, null, null, $4) RETURNING "Id";`, 
            values: [user.name, user.email, user.password, user.phone]
        };
        pg.query(query, function (result) {
            cb && cb(result[0].Id);
        });
    },
    updateUserToken: function name(userId, token, cb) {
        const query = { 
            text: 'update public."Users" set "token"=$2, "token_exp" =$3 where "Id"=$1;',
            values: [userId, token, new Date(new Date().getTime() + (1000 * 60 * 60 * 24))]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    updateUser: function(user, cb){
        const query = { // change the query
            text: 'update public."Users" set "email"=$2, "password"=$3, "PhoneNumber"=$4, "Status"=$5, "Name"=$6 where "Id"=$1;',
            values: [user.id, user.email, user.password, user.phone, user.status, user.name]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    addPharmacy: function(checkin, cb){
        const query = { 
            text: `insert into "Pharmacies" ("Name", "Contact", "Phone", "Status", "lng", "lat", "isChecked", "CellPhone", "email", "glncode", "Country", "City", "Town", "Street", "Quarter", "Password") 
                                     values ($1,     $2,        $3,      1,        $4,    $5,    0,            $6,          $7,     $8,        $9,        $10,    $11,    $12,      $13,       $14) RETURNING "Id";`, 
            values: [
                checkin.pharmacyName,       // 1
                checkin.nameSurname,        // 2
                checkin.officePhone,        // 3
                checkin.lng,                // 4
                checkin.lat,                // 5
                checkin.gsm,                // 6
                checkin.email,              // 7
                checkin.glnCode,            // 8
                checkin.country,            // 9
                checkin.city,               // 10
                checkin.town,               // 11
                checkin.street,             // 12
                checkin.quarter,            // 13
                checkin.password            // 14
            ]
        };
        pg.query(query, function (result) {
            cb && cb(result[0].Id);
        });
    },
    async: { // async versions of the above
        getAllAsync: function(){
            return new Promise((resolve, reject) => {
                workDefinition.getAll(function (result) {
                    resolve(result);
                });
            });
        },
        getByIdAsync: function(id){
            return new Promise((resolve, reject) => {
                workDefinition.getById(id, function (result) {
                    resolve(result);
                });
            });
        },
        insertUserAsync: function(user){
            return new Promise((resolve, reject) => {
                workDefinition.insertUser(user, function (result) {
                    resolve(result);
                });
            });
        },
        updateUserAsync: function(user){
            return new Promise((resolve, reject) => {
                workDefinition.updateUser(user, function (result) {
                    resolve(result);
                });
            });
        }
    } 
};


module.exports = workDefinition;
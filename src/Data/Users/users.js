var pg =  require('./../Repository/postgre');

var workDefinition = {
    getAllAdminsEmails : function(cb, cbErr){
        const query = { // change the query
            text: 'SELECT email, "Name" FROM public."Users" where "Type" = 1 and "Status"=1',
            values: [],
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getAll: function(cb, cbErr){
        const query = { // change the query
            text: 'SELECT * FROM public."Users"',
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
                VALUES ($1, 1, 1, $2, $3, null, null, null, $4) RETURNING "Id";`, 
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
            text: 'update "UserGroupDefinitions" set "GroupName"=$2, "Status"=$3 where "Id"=$1;',
            values: [groupid, groupname, status]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    deleteUser: function(id, cb){
        const query = { 
            text: 'update public."Users" set "Status"=3 where "Id"=$1;',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    getUserByToken : function(token, cb){
        const query = {
            text: 'select * from public."Users" where "token" = $1',
            values: [token]
        };
        pg.query(query, function (result) {
            cb && cb(result);
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
        },
        getUserByTokenAsync: function(token){
            return new Promise((resolve, reject) => {
                workDefinition.getUserByToken(token, function (result) {
                    resolve(result);
                });
            });
        },
        getAllAdminsEmailsAsync: function(){
            return new Promise((resolve, reject) => {
                workDefinition.getAllAdminsEmails(function (result) {
                    resolve(result);
                });
            });
        }

    } 
};


module.exports = workDefinition;
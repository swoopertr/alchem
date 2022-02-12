var pg =  require('./../Repository/postgre');

var workDefinition = {
    getAll: function(cb){
        const query = { // change the query
            text: 'select * from "UserGroupDefinitions"',
            values: [],
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    getById: function(id, cb){
        const query = { // change the query
            text: 'select * from "UserGroupDefinitions" where "Id" =$1;',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        });
    },
    insertUser: function(user, cb){
        const query = { // change the query
            text: 'insert into "UserGroupDefinitions" ("GroupName", "Status") values($1, $2) RETURNING "Id";', 
            values: [groupname, status]
        };
        pg.query(query, function (result) {
            cb && cb(result[0].Id);
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
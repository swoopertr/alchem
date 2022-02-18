var pg =  require('./../Repository/postgre');


var workDefinition = {
    getUnexpiredTokens: function(cb, cbErr){
        const query = {
            text: 'select * from public."Users" where token_exp > now();',
            values: [],
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: { // async versions of the above
        getUnexpiredTokens: function(){
            return new Promise(function(resolve, reject){
                workDefinition.getUnexpiredTokens(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        }
    }
};

module.exports = workDefinition;
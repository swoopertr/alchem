var pg =  require('./../Repository/postgre');


var workDefinition = {
    getproducts: function(cb, cbErr){
        const query = {
            text: 'select * from public."Products"',
            values: [],
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: { // async versions of the above
        getproducts: function(){
            return new Promise(function(resolve, reject){
                workDefinition.getproducts(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        }
    }
};

module.exports = workDefinition;
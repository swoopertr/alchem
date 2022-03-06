var pg = require('./../Repository/postgre');

var survey_data= {
    get_survey_by_productId : function(id,cb,cbErr){
        const query = {
            text: 'select * from public."Survey" where "ProductId" = $1',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: {
        get_survey_by_productId : function(id){
            return new Promise(function(resolve,reject){
                survey_data.get_survey_by_productId(id,function(result){
                    resolve(result);
                },function(err){
                    reject(err);
                });
            });
        }
    }
};

module.exports = survey_data;
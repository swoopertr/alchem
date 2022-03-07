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
    update_survey : async function(data,cb,cbErr){
        let product_survey = await survey_data.async.get_survey_by_productId(data.productId);
        let query;
        if(product_survey.length > 0){ // make update
            query = {
                text: `update "Survey" set "Name" = $1, "Status" = $2 where "ProductId" = $3;`,
                values: [data.surveyName, data.surveyStatus, data.productId]
            };
        } else { // make insert
            query = {
                text: `insert into "Survey" ("Name", "Status", "ProductId") values ($1, $2, $3);`,
                values: [data.surveyName, data.surveyStatus, data.productId]
            };
        }

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
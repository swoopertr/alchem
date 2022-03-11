var pg = require('./../Repository/postgre');

var answers_work = {
    saveAnswers :function(answers, cb, cbErr) {

        let query = {
            text: `insert into "Survey" ("Name", "Status", "ProductId") values ($1, $2, $3);`,
            values: [data.surveyName, data.surveyStatus, data.productId]
        };
       

        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async:{
        saveAnswers : function (answers) {
            return new Promise(function (resolve, reject) {
                answers_work.saveAnswers(answers, function (result) {
                    
                },
                function (err) {
                    
                }); 
            });
        }
    }


};
module.exports = answers;
var pg = require('../Repository/postgre');

var answers_work = {
    saveAnswers :function(answer, cb, cbErr) {
        let query = {
            text: `insert into "SurveyAnswers" ("QuestionId", "OptionId", "SendedSurveyId") values ($1, $2, $3);`,
            values: [answer.QuestionId, answer.OptionId, answer.SendedSurveyId]
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
                    resolve(result);
                },
                function (err) {
                    reject(err);
                }); 
            });
        }
    }


};
module.exports = answers_work;
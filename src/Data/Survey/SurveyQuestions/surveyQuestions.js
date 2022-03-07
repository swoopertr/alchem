var pg = require('./../Repository/postgre');


var survey_questions = {
    getQuestionsBySurveyId : function(surveyId, cb, cbErr){
        const query = {
            text: 'select * from public."SurveyQuestions" where "SurveyId" = $1',
            values: [surveyId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: {
        getQuestionsBySurveyId : function(surveyId){
            return new Promise(function(resolve,reject){
                survey_questions.getQuestionsBySurveyId(surveyId,
                    function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
            });
        }
    }
};

module.exports = survey_questions;
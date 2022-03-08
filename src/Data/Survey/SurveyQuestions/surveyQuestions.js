var pg = require('./../../Repository/postgre');


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
    getQuestion: function(id, cb, cbErr){
        const query = {
            text: 'select * from public."SurveyQuestions" where "Id" = $1',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    upd_insert_question: function(data, cb, cbErr){
        if(data.questionId == undefined){ // insert
            query = {
                text: `insert into "SurveyQuestions" ("Question", "Status", "Order", "SurveyId") values ($1, 1, 0, $2);`,
                values: [data.question, data.surveyId]
            };
        }else{ // update
            query = {
                text: `update "SurveyQuestions" set "Question"= $2 where "Id"=$1 ;`,
                values: [data.questionId, data.question]
            };
        }
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
        },
        getQuestion : function(id){
            return new Promise(function (resolve, reject) {
                survey_questions.getQuestion(id,
                    function (result) {
                        resolve(result);
                    },
                    function (err) {
                        reject(err);
                    });
            });
        }
    }
};

module.exports = survey_questions;
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
    deleteQuestion: function(questionId, cb, cbErr){
        const query = {
            text: 'delete from public."SurveyQuestions" where "Id" = $1',
            values: [questionId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        }); 
    },
    getQuestionOptionssBySurveyId: function (questionId, cb, cbErr) {
        const query = {
            text: 'select * from public."SurveyQuestionsOptions" where "SurveyQuestionId" = $1',
            values: [questionId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        }); 
    },
    deleteQuestionOptions : function (questionId, cb, cbErr) {
        const query = {
            text: 'delete from public."SurveyQuestionsOptions" where "SurveyQuestionId" = $1',
            values: [questionId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });     
    },
    insertQuestionOptions : function (data, cb, cbErr) {
        const query = {
            text: 'insert into "SurveyQuestionsOptions" ("SurveyQuestionId", "Option", "IsCorrect") values ($1, $2, $3)',
            values: [data.SurveyQuestionId, data.question, data.isCorrect]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: {
        insertQuestionOptions : function (data) {
            return new Promise((resolve, reject) => {
                survey_questions.insertQuestionOptions(data, function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        },
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
        },
        deleteQuestion : function(questionId){
            return new Promise(function (resolve, reject) {
                survey_questions.deleteQuestion(questionId,
                    function (result) {
                        resolve(result);
                    },
                    function(err){
                        reject(err);s
                    });
            });
        },
        getQuestionOptionssBySurveyId: function (questionId) {
            return new Promise(function (resolve, reject) {
                survey_questions.getQuestionOptionssBySurveyId(questionId,
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
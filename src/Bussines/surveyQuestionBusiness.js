const core = require('../Core');
var data_product = require('./../Data/Products/products');
var data_survey_question = require('./../Data/Survey/SurveyQuestions/surveyQuestions');
var fs = require('fs');

var survey_questions = {
    getQuestionsBySurveyId: function (surveyId, cb, cbErr) {
        data_survey_question.getQuestionsBySurveyId(surveyId, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getQuestion: function (id, cb, cbErr) {
        data_survey_question.getQuestion(id, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    upd_insert_question: function (data, cb, cbErr) {
        data_survey_question.upd_insert_question(data,
            function (result) {
                cb && cb(result);
            },
            function (err) {
                cbErr && cbErr(err);
            });
    },
    deleteQuestion: function (questionId, cb, cbErr) {
        data_survey_question.deleteQuestion(questionId,
            function (result) {
                cb && cb(result);
            },
            function (err) {
                cbErr && cbErr(err);
            });
    },
    getAnswersByQuestionId: function (questionId, cb, cbErr) {
        data_survey_question.getQuestionOptionssBySurveyId(questionId,
            function (result) {
                cb && cb(result);
            },
            function (err) {
                cbErr && cbErr(err);
            });
    },
    deleteQuestionOptions: function (questionId, cb, cbErr) {
        data_survey_question.deleteQuestionOptions(questionId,
            function (result) {
                cb && cb(result);
            },
            function (err) {
                cbErr && cbErr(err);
            });
    },
    insertQuestionOptions: async function (options, cb, cbErr) {
        try {
            for (let i = 0; i < options.length; i++) {
                let element = options[i];
                await data_survey_question.async.insertQuestionOptions(element);
            }
            cb && cb(1);    
        } catch (error) {
            cbErr && cbErr(error);   
        }
        
    },
    updateQuestionOptions: function (data, cb, cbErr) {
        survey_questions.deleteQuestionOptions(data.questionId, function (result_delete) {
            for (let i = 0; i < data.options.length; i++) {
                data.options[i].SurveyQuestionId =data.questionId;
                data.options[i].isCorrect = data.options[i].isCorrect ===true ? 1 : 0;
            }
            survey_questions.insertQuestionOptions(data.options, function (result_insert) {
                cb && cb(result_insert);
            }, function (err) {
                cbErr && cbErr(err);
            });
        });
    },
    async: {
        getAnswersByQuestionId: async function (questionId) {
            return await data_survey_question.async.getQuestionOptionssBySurveyId(questionId);
        }
    }
};


module.exports = survey_questions;
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
    getQuestion : function(id, cb, cbErr){
        data_survey_question.getQuestion(id, function(result){
            cb && cb(result);
        }, function(err){
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
    deleteQuestion: function(questionId, cb, cbErr){
        data_survey_question.deleteQuestion(questionId,
            function(result){
                cb && cb(result);
            },
            function(err){
                cbErr && cbErr(err);
            });
    }
};


module.exports = survey_questions;
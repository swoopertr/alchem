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
    }
};


module.exports = survey_questions;
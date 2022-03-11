var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var productBusiness = require('./../Bussines/productBusiness');
var surveyBussiness = require('./../Bussines/surveyBusiness');
var surveyQuestionsBusiness = require('./../Bussines/surveyQuestionBusiness');
var pharmacyBusiness = require('./../Bussines/pharmacyBussiness');
var core = require('./../Core');
var url = require('url');
const { async } = require('../Data/Products/products');


var survey = {
    survey_add: async function (req, res) {
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        var data = {
            data: {}
        };

        let qs = url.parse(req.url, true).query;
        let id = qs.id; // product id

        let product = await productBusiness.async.getProduct(id);
        data.product = product[0] ?? {};
        
        let survey =  await surveyBussiness.async.getSurvey(id);
        data.survey = survey[0] ?? {};
        
        render.renderHtml(res, view.views["survey"]["survey_add_update"], data);
    },
    survey_add_post: async function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function () {
            console.log(req.formData);
            surveyBussiness.updateSurvey(req.formData, function (result) {
                render.renderData(res, result);
            }, function (err) {
                render.renderData(res, err);
            });
        });
    },
    survey_question_list : async function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        
        
        var data = {
            data: {}
        };

        let qs = url.parse(req.url, true).query;
        let id = qs.id;

        surveyQuestionsBusiness.getQuestionsBySurveyId(id, function (result) {
            data.id = id;
            data.list = result;
            render.renderHtml(res, view.views["surveyQuestions"]["survey_question_list"], data);
        }, function (err) {
            render.renderFail(res, 500, err);
        });


    },
    survey_question_upd_insert : async function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
           
        var data = {
            data: {}
        };

        let qs = url.parse(req.url, true).query;
        let surveyId = qs.surveyId;
        let questionId = qs.questionId;
        data.surveyId = surveyId;

        if(questionId == 0){ // insert
            render.renderHtml(res, view.views["surveyQuestions"]["survey_question_add"], data);
        }
        else{ // update
            surveyQuestionsBusiness.getQuestion(questionId, function (result) {
                data.data = result[0];
                render.renderHtml(res, view.views["surveyQuestions"]["survey_question_add"], data);
            });
        }
    },
    survey_question_upd_insert_post : async function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function () {
            console.log(req.formData);
            surveyQuestionsBusiness.upd_insert_question(req.formData, 
                function (result) {
                    render.renderData(res, result);
                }, 
                function (err) {    
                    render.renderData(res, err);
                });

        });

    },
    survey_question_delete: function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        req.on('end', function () {
           console.log(req.formData.questionId);
            surveyQuestionsBusiness.deleteQuestion(req.formData.questionId, 
                function (result) {
                    render.renderData(res, result);
                }, 
                function (err) {    
                    render.renderData(res, err);
                });

        });
    },
    survey_question_answer_list: function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        var data = {
            data: {}
        };

        let qs = url.parse(req.url, true).query;
        let surveyId = qs.surveyId;
        let questionId = qs.questionId;

        surveyQuestionsBusiness.getAnswersByQuestionId(questionId, function (result) {
            data.questions = result;
            data.questionId = questionId;
            data.surveyId = surveyId;
            render.renderHtml(res, view.views["surveyQuestionOptions"]["question_list"], data);
        });
    },
    survey_question_answer_list_post: function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        var data = {
            data: {}
        };

        req.on('end', function () {
            console.log(req.formData);
            surveyQuestionsBusiness.updateQuestionOptions(req.formData, function (result) {
               render.renderData(res, result); 
            });
        });

    },
    survey_send: function(req, res){
        var cookies = core.parseCookies(req);
        if(cookies == undefined){
            core.redirect(res, '/login');
            return;
        }
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        var data = {
            data: {}
        };
        ;
        pharmacyBusiness.getPharmacyById(parseInt(cookies.selected_pharmacy), function(pharmacy){
            data.pharmacy = pharmacy[0];
            render.renderHtml(res, view.views["survey"]["presentation_question"], data);
        });
        

    },
    survey_evaluate: function(req, res){
        var data = {    
        };

        //http://alchemlifeegitim.com/survey/evaluate?id=817s3vq05p5v45msajla88a1rwn8hs599rvb9bap9u9qagab87
        
        let qs = url.parse(req.url, true).query;
        let id = qs.id;

        surveyBussiness.getSendedInfo(id, function (result) {
            pharmacyBusiness.getPharmacyById(parseInt(result[0].PharmacyId), function(pharmacy){
                data.pharmacy = pharmacy[0].Name;
                data.survey = result[0].SurveyId;
                data.id = id;
                surveyBussiness.getSurveyQuestions(result[0].SurveyId, async function (questions) {
                    data.questions = questions;                
                    for (let i = 0; i < data.questions.length; i++) {
                        data.questions[i].options =  await surveyQuestionsBusiness.async.getAnswersByQuestionId(data.questions[i].Id);
                    }
                    render.renderHtml(res, view.views["survey"]["evaluate_question"], data);
                });
                
            });
           
        }, function (err) {
            render.renderFail(res, 500, err);
        });
    
    },
    survey_evaluate_post: function(req, res){

        req.on('end', function () {
            console.log(req.formData);
           
        });

    }

};

module.exports = survey;
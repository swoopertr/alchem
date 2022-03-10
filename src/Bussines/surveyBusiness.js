const core = require('../Core');
var data_product = require('./../Data/Products/products');
var data_survey = require('./../Data/Survey/survey');
var SendedSurveys = require('./../Data/SendedSurvey/sendedSurvey');
var fs = require('fs');

var survey_product = {
    getSurvey: function(id, cb, cbErr){
        data_survey.get_survey_by_productId(id, function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    },
    updateSurvey: function(data, cb, cbErr){
        data_survey.update_survey(data, function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    },
    generateLink : function(data, cb, cbErr){
        SendedSurveys.insert(data,function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    },
    getSendedInfo: function(id, cb, cbErr){
        SendedSurveys.get_sended_survey_by_id(id, function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    },
    async: {
        getSurvey: function(id){
            return new Promise(function(resolve,reject){
                survey_product.getSurvey(id,function(result){
                    resolve(result);
                },function(err){
                    reject(err);
                });
            });
        },
        updateSurvey: function (data) {
            return new Promise(function (resolve, reject) {
                SendedSurveys.updateSurvey(data,
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

module.exports = survey_product;
const core = require('../Core');
var data_report = require('./../Data/Report/report');
var fs = require('fs');

var bussines_report = {
    getAnswerReport: function (cb, cbErr) {
        data_report.getAnswerReport(function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getCheckinReport: function(cb, cbErr){
        data_report.getCheckinReport(function(result){
            cb && cb(result);
        }, function(err){
            cbErr && cbErr(err);
        });
    },
    async: {
      
    }
};

module.exports = bussines_report;
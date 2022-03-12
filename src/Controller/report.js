var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var reportBussines = require('./../Bussines/reportBusiness');
var core = require('./../Core');
var url = require('url');
var fs = require('fs');
var settings = require('./../Config/setting');

var report = {
    survey_report: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        reportBussines.getAnswerReport(function (result) {
            var data = {
                list: result
            };
            render.renderHtml(res, view.views["report"]["survey_report"], data);
        });

    }
   
};


module.exports = report;
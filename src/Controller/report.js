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
            for (var i = 0; i < data.list.length; i++) {
                data.list[i].CreatedAt = core.formatDate(data.list[i].CreatedAt);
                data.list[i].StartedDate = core.formatDate(data.list[i].StartedDate);
            }
            render.renderHtml(res, view.views["report"]["survey_report"], data);
        });
    },
    report_checkin: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        reportBussines.getCheckinReport(function (result) {
            var data = {
                list: result
            };
            for (var i = 0; i < data.list.length; i++) {
                data.list[i].CreatedAt = core.formatDate(data.list[i].CreatedAt);
            }
            render.renderHtml(res, view.views["report"]["checkin_report"], data);
            
        });
    }
   
};


module.exports = report;
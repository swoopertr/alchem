
var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var core = require('./../Core');
var url = require('url');


var survey = {
    survey_list : function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/login');
            return;
        }
        
        render.renderHtml(res, view.views["survey"]["survey_list"], {});
    }

};

module.exports = survey;
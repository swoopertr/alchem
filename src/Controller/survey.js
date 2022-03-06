var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var productBusiness = require('./../Bussines/productBusiness');
var surveyBussiness = require('./../Bussines/surveyBusiness');
var core = require('./../Core');
var url = require('url');
const { async } = require('../Data/Products/products');


var survey = {
    survey_list: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        render.renderHtml(res, view.views["survey"]["survey_list"], {});
    },
    survey_add: async function (req, res) {
        var cookies = core.parseCookies(req);
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
        data.product = product[0];
        
        let survey =  await surveyBussiness.async.getSurvey(id);
        data.survey = survey[0];
        
        render.renderHtml(res, view.views["survey"]["survey_add_update"], data);
    }

};

module.exports = survey;
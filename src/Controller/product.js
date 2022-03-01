var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var core = require('./../Core');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var settings = require('./../Config/setting');

var product = {
    productList: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/login');
            return;
        }

        userBusiness.checkToken(token, function(token_result){
            if(token_result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{
                adminBussiness.getProducts(function(result){          
                    var data = {
                        list: result
                    };
                    render.renderHtml(res, view.views["product"]["urunler"], data);
                });
            }
        });

    },
    productUpdate: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/login');
            return;
        }

        let qs = url.parse(req.url, true).query;
        let id = qs.id;
        //todo get data from db
        render.renderHtml(res, view.views["product"]["update_product"], {});
    },
    productUpdate_post: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function () {
             console.log( req.formData);  
        });
    }
};


module.exports = product;
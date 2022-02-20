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


var admin = {
    admin: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{
                render.renderHtml(res, view.views["admin"]["index"], {});
            }
             
        });
    },
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
                    render.renderHtml(res, view.views["admin"]["urunler"], data);
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
        render.renderHtml(res, view.views["admin"]["update_product"], {});
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
    },
    fudAdd: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/login');
            return;
        }

        let qs = url.parse(req.url, true).query;
        let id = qs.id;
        render.renderHtml(res, view.views["admin"]["fud_add"], {});
    },
    fudAdd_post: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/login');
            return;
        }
         
        req.on('end', function () {
            
            let qs = url.parse(req.url, true).query;
            let id = qs.id || 0;
            if(id==0){  //insert
                req.formData.id= id;
                adminBussiness.addFud(req.formData, function(result){
                    let newFudId = result;
                    render.renderData(res, {newFudId});
                });
            }else{ //update
                adminBussiness.updateFud(req.formData, function(result){

                });
            }

        });

        

    }
};

module.exports= admin;
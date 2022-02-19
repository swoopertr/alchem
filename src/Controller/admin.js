var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var core = require('./../Core');
var admin = {
    admin: function (req, res) {
        var token =req.sess.get('token');
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
        adminBussiness.getProducts(function(result){    
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
                    var data = {
                        list: result
                    };
                    render.renderHtml(res, view.views["admin"]["urunler"], data);
                }
                
            });
        });
    }
};

module.exports= admin;
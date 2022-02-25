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
    }
  
    
    
    
};

module.exports= admin;
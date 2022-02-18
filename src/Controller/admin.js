var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
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
        //render.renderData(res, {page: "admin"});
        
    }
};

module.exports= admin;
var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');

var admin = {
    admin: function (req, res) {
        var token =req.sess.get('token');
        userBusiness.checkToken(token, function(result){
            
        });
        //render.renderData(res, {page: "admin"});
        render.renderHtml(res, view.views["admin"]["index"], {});
    }
};

module.exports= admin;
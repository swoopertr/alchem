var render = require('./../Middleware/render');
var userBusiness = require('./../Bussines/userBusiness');
var view = require('./../Middleware/ViewPack');

var user_api = {
    getChars: function(req, res){
        userBusiness.getChars(function(result){
            render.renderData(res, result);
        });
    },
    chars: function(req, res){
        userBusiness.getChars(function(result){
            render.renderHtml(res, view.views["user"]["ram"], result );
        });
    },
    login: function(req, res){
        render.renderHtml(res, view.views["user"]["login"],{});
    }
};

module.exports = user_api;
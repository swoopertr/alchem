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
   
    getUsers: function(req, res){
        userBusiness.getAllUsers(function(result){
            render.renderData(res, result);
        });
    },
    login: function(req, res){
        render.renderHtml(res, view.views["user"]["login"] ,{});
    },
    login_post: function(req, res){
        req.on('end', function () {
            if(!req.formData.username){
                render.renderFail(res, 400, 'Name', "Name Error");
                return;
            }
            if(!req.formData.password){
                render.renderFail(res, 400, 'Status', "Status Error");
                return;
            }
            userBusiness.login(req.formData.username, req.formData.password, function(result){
                if(result.status != "not_found"){
                    render.renderData(res, result);
                }else{
                    render.renderFail(res, {status:"fail"});
                }
                
            });
        });
    },
    checkToken: function(req, res){
        var token = req.headers.token;
        var userPageType = req.headers.userpagetype;
        userBusiness.checkToken(token, function(result){
            if(result != null){
                if(result["type"] == userPageType){
                    render.renderData(res, {status : "success"});
                }else{
                    render.renderData(res, {status : "fail"});
                }
            }else{
                render.renderData(res, {status : "fail"});
            }
        });
    }
};

module.exports = user_api;
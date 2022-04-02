var render = require('./../Middleware/render');
var exuserBusiness = require('./../Bussines/exuserBusiness');
var view = require('./../Middleware/ViewPack');

let exlogin = {
    login: function(req, res){
        render.renderHtml(res, view.views["exlogin"]["login"] ,{});
    },
    login_post: function(req, res){
        req.on('end', function(){ 
            exuserBusiness.login(req.formData.username, req.formData.password, function(result){
                if(result == 0){
                    render.renderData(res,{error:'username and password is incorrect!'}, 'json');
                }else{
                    render.renderData(res, result, 'json');
                }
            });
        });
    },
    checkToken: function(req, res){
        req.on('end', function(){
            exuserBusiness.checkToken(req.formData.token, function(result){
                if(result == false){
                    render.renderData(res, {
                        status: "fail"
                    }, 'json');
                }else{
                    render.renderData(res, {
                        status: "success"
                    }, 'json');
                }
            });
        });
    }
};

module.exports=exlogin;
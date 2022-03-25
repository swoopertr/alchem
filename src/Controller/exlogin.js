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
                if(result.length == 0){
                    render.renderData(res,{error:'username and password is incorrect!'}, 'json');
                }else{
                    render.renderData(res,result[0], 'json');
                }
            });
        });
    }
};

module.exports=exlogin;
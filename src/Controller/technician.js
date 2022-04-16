var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var exuserBusiness = require('./../Bussines/exuserBusiness');
var core = require('./../Core');

var technician = {
    index: function (req, res) {

        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/exlogin');
        }

        exuserBusiness.checkToken(token, function(result){
            if(result == false){
                core.redirect(res, '/exlogin');
            }else{
                render.renderHtml(res, view.views["technician"]["index"], {});
            }
             
        });
    },
    check_token: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            render.renderData(res, {
                status: "fail"
            }, 'json');
        }else{
            exuserBusiness.checkToken(token, function(result){
                if(result == false){
                    core.redirect(res, '/exlogin');
                }else{
                    render.renderData(res, {
                        status: "success"
                    }, 'json');
                }
            });
        }
    },
    surveys: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            render.renderData(res, {
                status: "fail"
            }, 'json');
        }else{
            exuserBusiness.checkToken(token, function(result){
                if(result == false){
                    core.redirect(res, '/exlogin');
                }else{
                    exuserBusiness.getAllSurveysByPharmacyId(result[0].Id ,function(result){
                        var data = {
                            surveys: result
                        };
                        render.renderHtml(res, view.views["technician"]["surveys"], {data});
                    });
                }
            }, function(err){
                render.renderData(res, {
                    status: "fail"
                }, 'json');
            });
        }
    }
}

module.exports = technician;
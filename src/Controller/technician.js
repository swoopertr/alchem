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
            core.redirect(res, '/exlogin');
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
            core.redirect(res, '/exlogin');
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
                core.redirect(res, '/exlogin');
            });
        }
    },
    feedback: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/exlogin');
        }else{
            exuserBusiness.checkToken(token, function(result){
                if(result == false){
                    core.redirect(res, '/exlogin');
                }else{
                    render.renderHtml(res, view.views["technician"]["feedback"], {});
                }
            }, function(err){
                render.renderData(res, {
                    status: "fail"
                }, 'json');
            });
        }
    },
    feedback_post: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/exlogin');
            return;
        }

        req.on('end', function(){
            exuserBusiness.checkToken(token, function(result){
                if(result == false){
                    core.redirect(res, '/exlogin');
                }else{
                    exuserBusiness.addFeedback(req.formData, function(result){
                        render.renderData(res, {
                            status: "success"
                        }, 'json');
                    }, function(err){
                        core.redirect(res, '/exlogin');
                    });
                }
            }, function(err){
                core.redirect(res, '/exlogin');
            });
        });
    },
    point_report: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/exlogin');
            return;
        }

        exuserBusiness.checkToken(token, function(result){
            if(result == false){
                core.redirect(res, '/exlogin');
            }else{
                render.renderHtml(res, view.views["technician"]["pointreport"], {});
            }
        }, function(err){
            render.renderData(res, {
                status: "fail"
            }, 'json');
        });

    }
}

module.exports = technician;
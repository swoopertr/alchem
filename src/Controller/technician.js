var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');

var userBusiness = require('./../Bussines/userBusiness');
var exuserBusiness = require('./../Bussines/exuserBusiness');

var pharmacyBusiness = require('./../Bussines/pharmacyBussiness');
var core = require('./../Core');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var settings = require('./../Config/setting');


var technician = {
    index: function (req, res) {

        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if(token == undefined){
            core.redirect(res, '/exlogin');
        }

        exuserBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
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
                    render.renderData(res, {
                        status: "fail"
                    }, 'json');
                }else{
                    render.renderData(res, {
                        status: "success"
                    }, 'json');
                }
            });
        }
    }
}

module.exports = technician;
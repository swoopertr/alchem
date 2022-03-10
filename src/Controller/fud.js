var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var fudBusiness = require('./../Bussines/fudBussiness');
var pharmacyBusiness = require('./../Bussines/pharmacyBussiness');
var userBusiness = require('./../Bussines/userBusiness');
var surveyBusiness = require('./../Bussines/surveyBusiness');

var core = require('./../Core');
var url = require('url');

var fud = {
    fud_page: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        render.renderHtml(res, view.views["fud"]["fud_page"], {});
    },
    fuds: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        fudBusiness.fuds(function (result) {
            var data = {
                list: result
            };
            render.renderHtml(res, view.views["fud"]["fud_list"], data);
        });
    },
    fudUpdate: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        let qs = url.parse(req.url, true).query;
        let id = qs.id;

        render.renderHtml(res, view.views["fud"]["fud_add"], {});

        
    },
    fudUpdate_post: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function () {
            let qs = url.parse(req.url, true).query;
            let id = req.formData.id;
            if (id == 0) { //insert
                req.formData.id = id;
                fudBusiness.addFud(req.formData, function (result) {
                    let newFudId = result;
                    render.renderData(res, { newFudId });
                    
                });
            } else { //update
                fudBusiness.updateFud(req.formData, function (result) {d
                    render.renderData(res, { newFudId });
                });
            }

        });
    },
    fud_productList: function (req, res) {
        fudBusiness.products(function (result) {
            var last_result = [];
            for(var i = 0; i < result.length; i++){
                if(result[i].Status == 1){
                    last_result.push(result[i]);
                }
            }

            var data = {
                list: last_result
            };
            render.renderHtml(res, view.views["fud"]["fud_products"], data);
        });
    },
    fud_savepharmacy :function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        render.renderHtml(res, view.views["fud"]["fud_savepharmacy"], {});
    },
    fud_add_pharmacy_post: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function () {
            fudBusiness.addPharmacy(req.formData, function (result) {
                render.renderData(res, result );
            });
        });
    },
    fud_checkin: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        pharmacyBusiness.getAllPharmacies(function (result) {
            var data = {
                pharmacies: result
            };
            render.renderHtml(res, view.views["fud"]["fud_checkin"], data);
        });
    },
    fud_checkin_post: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function () {
            userBusiness.getUserByToken(token, function(user){
                if(user.length > 0){
                    req.formData.UserId = user[0].Id;
                    fudBusiness.checkin(req.formData, function (result) {
                        render.renderData(res, result);
                    });
                }
                
            });
        });
    },
    fud_pharmacylist: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        pharmacyBusiness.getAllPharmacies(function (result) {
            var data = {
                pharmacies: result
            };
            render.renderHtml(res, view.views["fud"]["fud_pharmacylist"], data);
        });

    },
    fud_generatetoken: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        let qs = url.parse(req.url, true).query;
        let id = qs.id; //product id

        userBusiness.getUserByToken(token, async function (user) {
            if (user.length > 0) {
             var selected_pharmacy = req.formData.PharmacyId;
             var uniqueValue = core.GenerateToken();
           
            var survey = await surveyBusiness.async.getSurvey(id);
            var data = {
                PharmacyId : selected_pharmacy,
                uniqueValue,
                surveyId : survey[0].Id,
                expiredAt : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                userId : user[0].Id
            };
            surveyBusiness.generateLink(data, function (result) {
                if(result != "0"){
                    render.renderData(res, { uniqueValue });
                }
            });
            
             
            }
                
        });
    }
    
};
module.exports = fud;
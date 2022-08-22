var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var fudBusiness = require('./../Bussines/fudBussiness');
var pharmacyBusiness = require('./../Bussines/pharmacyBussiness');
var userBusiness = require('./../Bussines/userBusiness');
var surveyBusiness = require('./../Bussines/surveyBusiness');
var technicianBusiness = require('./../Bussines/technicianBusiness');


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
            
            let tmpList= [];
            for (let i = 0; i < result.length; i++) {
                var item = result[i];
                if (item.Status != 3) {
                    tmpList.push(item);
                }
            }
            var data = {
                list: tmpList
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
        if(id == 0){
            var data = {
                data: {}
            };
            render.renderHtml(res, view.views["fud"]["fud_add"], data);
        }else{
            fudBusiness.fudById(id, function(result){
                var data = {
                    data: result[0]
                };
                render.renderHtml(res, view.views["fud"]["fud_add"], data);
            });
        }
        
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
                    render.renderData(res, {status:"success", newFudId });
                    
                });
            } else { //update
                fudBusiness.updateFud(req.formData, function (result) {
                    render.renderData(res, { status:"success" });
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
            userBusiness.getUserByToken(token, function (data) {
                req.formData.fudId = data[0].Id;
                fudBusiness.addPharmacy(req.formData, function (result) {
                    render.renderData(res, result );
                });    
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
            let availables = [];
            for(let i = 0; i< result.length;i++){
                let item = result[i];
                if(item.Status == 1){
                    availables.push(item);
                }    
            }
            var data = {
                pharmacies: availables
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
                    PharmacyId: selected_pharmacy,
                    uniqueValue,
                    surveyId: survey[0].Id,
                    expiredAt: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                    userId: user[0].Id
                };
                surveyBusiness.generateLink(data, function (result) {
                    if (result != "0") {
                        render.renderData(res, {
                            uniqueValue
                        });
                    }
                });


            }

        });
    },
    fudDelete: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        req.on('end', function () {
            userBusiness.updateUserDelete(req.formData.id, function(result) {   
                if(result == 1 ) {
                    render.renderData(res, {status: "success"});
                }else{
                    render.renderData(res, {status: "error"});
                }
            });
        });

    },
    fud_checkins: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        //todo: to check if user is login and authorize to make this request. make it work for global usage
        userBusiness.getUserByToken(token, async function (user) {
            if (user.length > 0) {
                var data = {
                    userId: user[0].Id
                };
                fudBusiness.getCheckin(data.userId, function (result) {
                    data.list = result;
                    render.renderHtml(res, view.views["fud"]["fud_checkins"], data);
                });
            }
        });

    },
    get_pharmacy_technican: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        //todo: to check if user is login and authorize to make this request. make it work for global usage
        let qs = url.parse(req.url, true).query;
        userBusiness.getUserByToken(token, async function (user) {
            if (user.length > 0) {
                var data = {
                    userId: user[0].Id
                };
                technicianBusiness.getPharmacyId(parseInt(qs.id), function (result) {
                    let lastResult = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        if(item.Status == 1){
                            lastResult.push(item);
                        }
                        
                    }
                    data.list = lastResult;
                    data.pharmacyId = qs.id;
                    render.renderHtml(res, view.views["fud"]["fud_pharmacy_technican_list"], data);
                });

            }
        });
    },
    edittechnician : function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        let qs = url.parse(req.url, true).query;
        userBusiness.getUserByToken(token, async function (user) {
            if (user.length > 0) {
                var data = {
                    userId: user[0].Id
                };
                if(qs.pharmacyid == undefined){
                    core.redirect(res, '/fud');
                    return;
                }
                let pharmacy = await pharmacyBusiness.getPharmacyByIdAsync(qs.pharmacyid);
                    if(pharmacy.length == 0){
                        core.redirect(res, '/fud');
                        return;    
                    }
                if(parseInt(qs.id) == 0){
                    var data = {
                        technician : {},
                        pharmacy : pharmacy[0]
                    };
                    render.renderHtml(res, view.views["fud"]["fud_edit_technician"], data);
                    return;
                    
                } else {
                    technicianBusiness.getOne(parseInt(qs.id), function (result) {
                        data.pharmacy = pharmacy[0];
                        data.technician = result[0]
                        render.renderHtml(res, view.views["fud"]["fud_edit_technician"], data);
                    });
                }
                
            }
        });
    },
    upsert_technician : function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        req.on('end', function(){
            technicianBusiness.upsert(req.formData, function(result){
                if(result){
                    render.renderData(res, { status: "success" });
                }else{
                    render.renderData(res, { status: "error" });
                }
            });
        });
    },
    delete_technician : function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        req.on('end', function(){
            technicianBusiness.delete(req.formData, function(result){
                if(result){
                    render.renderData(res, { status: "success" });
                    return;
                }else{
                    render.renderData(res, { status: "error" });
                    return;
                }
            });
        });
    }
    
};
module.exports = fud;
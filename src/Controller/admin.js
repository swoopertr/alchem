var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var pharmacyBusiness = require('./../Bussines/pharmacyBussiness');
var reportBussines = require('./../Bussines/reportBusiness');
var fudBusiness = require('./../Bussines/fudBussiness');
var technicianBusiness = require('./../Bussines/technicianBusiness');
var core = require('./../Core');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var settings = require('./../Config/setting');
var excelHelper = require('./../Helper/excelHelper');


var admin = {
    admin: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;

        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{
                render.renderHtml(res, view.views["admin"]["index"], {});
            }
             
        });
    },
    pharmacy_list: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;

        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{
                adminBussiness.getPharmacyList(function(result){
                    let tmpPharmacyList = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        if(item.Status != 3){
                            tmpPharmacyList.push(item);
                        }
                        
                    }                    
                    render.renderHtml(res, view.views["admin"]["pharmacy_list"], {
                        pharmacies: tmpPharmacyList
                    });
                });
            }
             
        });
    },
    deletePharmacy : function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
       
        req.on('end', function(){
            pharmacyBusiness.deletePharmacy(req.formData.id, function(result){
                if(result){
                    render.renderData(res, { status: "success" });
                }else{
                    render.renderData(res, { status: "error" });
                }
            });
        });
 
    },
    pharmacy_edit: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
         
        let qs = url.parse(req.url, true).query;
        let id = qs.id; //pharmacy id

        if(id == undefined){ //insert
           
        } else { // update
            pharmacyBusiness.getPharmacyById(id, function(result){
                var data = {
                    data: result[0]
                }
                render.renderHtml(res, view.views["admin"]["pharmacy_edit"], data);
            });
            
        }
    },
    pharmacy_edit_post: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        req.on('end', function(){

            pharmacyBusiness.updatePharmacy(req.formData, function(result){
                if(result){
                    render.renderData(res, { status: "success" });
                }else{
                    render.renderData(res, { status: "error" });
                }
            });
        });


    },
    pharmacy_send_password_post: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        req.on('end', function(){
            pharmacyBusiness.getPharmacyById(req.formData.id, function(result){
                if(result.length > 0){
                    pharmacyBusiness.sendPharmacyPasswordMail(result[0].email, result[0].Password, function(result){
                        render.renderData(res, { status: "success" });
                    });
                }else{
                    render.renderData(res, { status: "Account not found!!!" });
                }
            });
            
        });
    },
    fuds: async function(req, res){
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
            render.renderHtml(res, view.views["admin"]["fud_list"], data);
        });
    },
    allgoals: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }


        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{
                adminBussiness.getAvailableGoals(function(result){
                    let data= {
                        list:result
                    };
                    render.renderHtml(res, view.views["admin"]["allgoals"], data);
                });
                
            }
        });
    },
    goal_appoint: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }


        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{
                adminBussiness.getPharmacyList(function(result){
                    let tmpPharmacyList = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        if(item.Status != 3){
                            tmpPharmacyList.push(item);
                        }
                        
                    }                    
                    render.renderHtml(res, view.views["admin"]["pharmacy_list"], {
                        pharmacies: tmpPharmacyList
                    });
                });
            }
        });
    },
    delete_goal: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        req.on('end', function(){
            userBusiness.checkToken(token, function(result){
                if(result == false){
                    render.renderData(res, {
                        page: "admin",
                        auth: "fail"
                    });
                    core.redirect(res, '/login');
                }else{
                    var goalId = req.formData.id;
                    adminBussiness.deleteGoal(goalId, function(result){
                        console.log(result);
                        render.renderData(res, { result });
                    });
                }
            }); 
        });   
    },

    add_goal: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        } 
        
        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{  
                render.renderHtml(res, view.views["admin"]["goal_add"], {});
            }
        });


    },
    fud_excel: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        } 

        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{  

                reportBussines.getCheckinReport(async function (result) {
                    var data =result;
                    for (var i = 0; i < data.length; i++) {
                        data[i].CreatedAt = core.formatDate(data[i].CreatedAt);
                    }
                    let file = await excelHelper.GenerateExcelFileAsync('fud_rapor.xlsx','fud',data);
                
                    core.returnFile(settings.downloadFolder + 'fud_rapor.xlsx', res);    
                });
                
            }
        });
    },
    answers_excel : function (req, res) {

     var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        } 

        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{  

                reportBussines.getAnswerReport(async function (result) {
                    var data = {
                        list: result
                    };
                    for (var i = 0; i < data.list.length; i++) {
                        data.list[i].CreatedAt = core.formatDate(data.list[i].CreatedAt);
                        data.list[i].StartedDate = core.formatDate(data.list[i].StartedDate);
                    }
                    
                    let file = await excelHelper.GenerateExcelFileAsync('cevap_rapor.xlsx','fud', data.list);
                    core.returnFile(settings.downloadFolder + 'cevap_rapor.xlsx', res);   
                });

                
            }
        });

      
    },
    get_pharmacy_technican_admin: function(req, res){
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        } 

        userBusiness.checkToken(token, function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{  
                let qs = url.parse(req.url, true).query;
                technicianBusiness.getPharmacyId(parseInt(qs.id), function (result) {
                    let lastResult = [];
                    for (let i = 0; i < result.length; i++) {
                        let item = result[i];
                        if(item.Status != 3){
                            lastResult.push(item);
                        }
                    }
                    var data = {
                        list : lastResult,
                        pharmacyId: qs.id
                    };
                    render.renderHtml(res, view.views["admin"]["get_pharmacy_technican_admin"], data);
                });
            }
        });
    },
    edit_technician_admin: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        } 

        userBusiness.checkToken(token, async function(result){
            if(result == false){
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            }else{  
                let qs = url.parse(req.url, true).query;
                if(qs.pharmacyid == undefined){
                    core.redirect(res, '/admin');
                    return;
                }
                if(parseInt(qs.id)==0){
                    let pharmacy = await pharmacyBusiness.getPharmacyByIdAsync(qs.pharmacyid);
                    if(pharmacy.length == 0){
                        core.redirect(res, '/admin');
                        return;    
                    }
                    var data = {
                        technician : {},
                        pharmacy : pharmacy[0]
                    };
                    render.renderHtml(res, view.views["admin"]["edit_technician_admin"], data);
                    return;
                }
                technicianBusiness.getOne(parseInt(qs.id), function (technician) {
                    if(technician.length==0){
                        var data = {
                            technician : {},
                            pharmacy : {}
                        };
                        render.renderHtml(res, view.views["admin"]["edit_technician_admin"], data);
                        return;
                    }
                    pharmacyBusiness.getPharmacyById(technician[0].PharmacyId, function (pharmacy) {
                        var data = {
                            technician : technician[0],
                            pharmacy:pharmacy[0]
                        };
                        render.renderHtml(res, view.views["admin"]["edit_technician_admin"], data);
                    });
                });
            }
        });
    },
    upsert_technician_admin : function(req, res){
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
    delete_technician: function(req, res){
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

module.exports= admin;
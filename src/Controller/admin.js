var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var pharmacyBusiness = require('./../Bussines/pharmacyBussiness');
var core = require('./../Core');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var settings = require('./../Config/setting');


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
    }
  
    
    
    
};

module.exports= admin;
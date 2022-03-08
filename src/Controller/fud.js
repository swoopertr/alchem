var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var fudBusiness = require('./../Bussines/fudBussiness');
var core = require('./../Core');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var settings = require('./../Config/setting');

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
            var data = {
                list: result
            };
            render.renderHtml(res, view.views["fud"]["fud_products"], data);
        });
    },
    fud_presentation :function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        
        render.renderHtml(res, view.views["fud"]["fud_presentation"], {});
    }
};
module.exports = fud;
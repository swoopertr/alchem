var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');
var userBusiness = require('./../Bussines/userBusiness');
var adminBussiness = require('./../Bussines/adminBusiness');
var productBussines = require('./../Bussines/productBusiness');
var core = require('./../Core');
var url = require('url');
var formidable = require('formidable');
var fs = require('fs');
var settings = require('./../Config/setting');

var product = {
    productList: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        userBusiness.checkToken(token, function (token_result) {
            if (token_result == false) {
                render.renderData(res, {
                    page: "admin",
                    auth: "fail"
                });
                core.redirect(res, '/login');
            } else {
                adminBussiness.getProducts(function (result) {
                    result = result.filter((item)=> {
                       return item.Status !=3;
                    });
                   
                    var data = {
                        list: result
                    };
                    render.renderHtml(res, view.views["product"]["urunler"], data);
                });
            }
        });

    },
    productUpdate: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        let qs = url.parse(req.url, true).query;
        let id = qs.id;
        //todo get data from db
        if (id == 0) {
            var data = {
                data: {
                    id: 0,
                    name: "",
                    image: "",
                    filePath: "",
                    active: 1
                }
            }
            render.renderHtml(res, view.views["product"]["update_product"], data);
        } else {
            productBussines.getProduct(id, function (result) {
                var data;
                if (result.length == 0) {
                    data = {
                        data: {
                            Id: 0,
                            Name: "",
                            image: "",
                            filePath: "",
                            active: 0
                        }
                    }
                } else {
                    var data = {
                        data: result[0]
                    }
                }

                render.renderHtml(res, view.views["product"]["update_product"], data);
            });
        }

    },
    productUpdate_post: function (req, res) {
        console.log("productUpdate_post");
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }
        try {
            global.events.once(token + 'form_posted_end', function () {
                productBussines.ins_update_product(req.formData,
                    function (result) {
                        core.redirect(res, '/admin/urunler');
                    },
                    function (err) {
                        render.renderData(res, {
                            "error": "error"
                        });
                    });
            });
        } catch (error) {
            console.log(error);
        }

    },
    delete_product: function (req, res) {
        var cookies = core.parseCookies(req);
        var token = cookies.token;
        if (token == undefined) {
            core.redirect(res, '/login');
            return;
        }

        let qs = url.parse(req.url, true).query;
        let id = qs.id;

        productBussines.delete_product(id, function (result) {
            render.renderData(res, result);
        });

    }
};


module.exports = product;
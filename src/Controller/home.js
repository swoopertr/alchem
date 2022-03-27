var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');

var home = {
    main: function (req, res) {
        render.renderHtml(res, view.views["home"]["main"],{}); 
    }
};
module.exports = home;
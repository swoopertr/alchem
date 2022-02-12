var setting = require('./Config/setting');
var render = require('./Middleware/render');

function RouteGuider(req, res) {
    var routePath = req.url.split('?')[0];
    var verbName = req.method.toLowerCase();
    if (routePath[0] === "/") {
        routePath = routePath.substring(1);
    }
    if (routePath == "") {
        routePath = "home";
    }
    if (global.routes.hasOwnProperty(routePath)) {
        if (global.routes[routePath].hasOwnProperty(verbName)) {
            var item = global.routes[routePath][verbName];
            var controller = require(setting.controllerFolder + item.controller);
            controller[item.function](req, res);
        } else{
            render.renderData(res, 'This method is not supported!', 'text');
        }
    } else {
        render.renderData(res, 'This URL is not exist!', 'text');
    }
};
module.exports = {
    guideRequest: RouteGuider
};
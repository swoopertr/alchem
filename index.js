var http = require('http');
var https = require('https');
var setting = require('./src/Config/setting');
var core = require('./src/Core');
var mimeCore = require('./src/Middleware/mimefilter');
var render = require('./src/Middleware/render');
var cluster = require('cluster');
var dataCache = require('./src/Data/Cache/dataCache');
var fs = require('fs');


if (cluster.isMaster) {
    for (var i = 0; i < setting.cpuCount; i++) {
        cluster.fork();
    }
}else {
    render.init();
    render.initWatcher();
    dataCache.init().then(function(){console.log("dataCache init success")});
    core.initRouter(function () {
        var https_options = {
            key: fs.readFileSync('cert/private.key'),
            cert: fs.readFileSync('cert/certificate.crt'),
            ca:[
                fs.readFileSync('cert/ca_bundle.crt')
            ]
        };



        https.createServer(https_options ,function (req, res) {
            res.socket.setNoDelay();
            core.postHandler(req, res);
            mimeCore.catchMime(req, res);
        }).listen(setting.ServerPort);
        console.log("browse ==> https://localhost:" + setting.ServerPort);
    });
}
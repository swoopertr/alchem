var fs = require('fs');
var setting = require('./Config/setting');
var dir = process.cwd();
var formidable = require('formidable');
var events = require('events');

var GenerateGUID = function () {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

var GenerateToken = function () {
    return 'xxxxxxxxxxxx4xxxxxxyyyyxxxxxxxxxxxxyyyyxyxyxyxyxyx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 35 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(35);
    });
};

var GeneratePassword = function () {
    return Math.random().toString(36).slice(-8);
};

var getFileNames = function (directory, cb) {
    var results = [];
    var dirs = fs.readdirSync(directory);
    for (var i = 0; i < dirs.length; i++) {
        var files = fs.readdirSync(directory + dirs[i]);
        for (var j = 0; j < files.length; j++) {
            var obj = {controller: dirs[i], view: files[j].replace(/\.[^/.]+$/, "")};
            results.push(obj);
        }
    }
    cb && cb(results);
};

var getFolderFiles = function (dir, cb) {
    var results = [];
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var file = files[i].replace(/\.[^/.]+$/, "");
        results.push(file);
    }
    cb && cb(results);
};

var readFile = function (file, cb) {
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        }
        cb && cb(data);
    });
};

var getfileContentImg = function (res, filePath) {
    try {
        fs.readFile(dir + filePath, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.end(data);
        });    
    } catch (error) {
        res.write("");
        res.end();
    }
    
};

var getfileContentImgAsync = function (res, filePath) {
    try {
        var data = fs.readFileSync(dir + filePath);
        res.end(data);
    } catch (error) {
        res.write("");
        res.end();
    }
}

var getfileContent = function (res, filePath) { 
   try {
    fs.readFile(dir + filePath, function (err, content) {
        if (err) {
            console.log(err);
        }
        res.write(content);
        res.end();
    });
   } catch (error) {
    res.write("");
    res.end();
   }
   
};

var getfileContentAsync = function (res, filePath) {
    try {
        var content =  fs.readFileSync(dir + filePath);
        res.write(content);
        res.end();    
    } catch (error) {
        res.write("");
        res.end();
    }
    
};

var initRouteConfigWatcher = function () {
    fs.watch(dir + setting.jsonPath, function (err, content) {
        if (!global.fsTimeout) {
            global.fsTimeout = setTimeout(function () {
                loadRouteFile();
                console.log('route config reloaded');
                delete global.fsTimeout;
            }, 2000);
        }
    });
};

var loadRouteFile = function () {
    fs.readFile(dir + setting.jsonPath, 'utf-8', function (err, content) {
        var routes = JSON.parse(content);
        global.routes = routes;
    });
};

var callMethods = function (methods, i, cb) {
    if (i === methods.length - 1) {
        methods[i](function () {
            cb && cb();
        });
    } else {
        methods[i](function () {
            callMethods(methods, i + 1, cb);
        });
    }
};

var queryStringToObject = function (search) {
       return  JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
            return key === "" ? value : decodeURIComponent(value)
        });
};

var request = {
    get: function (baseUri, path, headers, cb){
        var http = require("https");

        var options = {
            "method": "GET",
            "hostname": baseUri,
            "port": null,
            "path": path
        };
        if (headers){
            options.headers = headers;
        }

        var getReq = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                var result =JSON.parse(body.toString());
                cb && cb(result);
            });
        });

        getReq.end();
    },
    post: function (baseUri, path, headers, body, cb){
        //todo
        var http = require("http");

        var options = {
            "method": "POST",
            "hostname": baseUri,
            "port": "80",
            "path": path,
            "headers": {
                "content-type": "application/json",
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.write(JSON.stringify({ email: 'tunc.kiral@gmail.com', pass: 'passq' }));
        req.end();

    },
    getAsync: function (baseUri, path, headers){
        return new Promise((resolve, reject) =>{
            request.get(baseUri,path, headers, function (result){
                resolve(result);
            });
        });
    },
    postAsync: function (){
        //todo..
    }
};


var returnFile = function (fileName, res) {
    fs.access(fileName, fs.constants.F_OK, function (err) {
        var sendFileName = fileName.substring(fileName.lastIndexOf('/') + 1);
        if (err) {
            res.writeHead(400, {"Content-Type": "text/plain"});
            res.end("ERROR File does not exist");
            
        } else {
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + sendFileName
            });
            fs.createReadStream(fileName).pipe(res);
        }
    });
};

var getDictionaryFormData = function (formData, fields, cb) {
    var result = {};
    var hashes = decodeURIComponent(formData.toString());
    var datas = hashes.split('&');
    for (var i = 0; i < datas.length; i++) {
        var itemObj = datas[i].split('=');
        for (var j = 0; j < fields.length; j++) {
            if (fields[j] === itemObj[0]) {
                result[fields[j]] = itemObj[1];
            }
        }
    }
    cb && cb(result);
};

var getActionName = function (actionId) {
    var result = "";
    if (actionId == 1) {
        result = "Insert";
    } else if(actionId == 2){
        result = "Update";
    } else if(actionId == 3){
        result = "Delete";
    }
    return result;
};

var postHandler = function (req, res) {
    if (req.method !== "POST") {
        return;
    }
    
    var routeName = req.url.split('/');
    var routePath = routeName[1].split('?')[0];
    if (routes.hasOwnProperty(routePath)) {
        var item = routes[routePath];
        if (item.hasOwnProperty('file') && item.file) { //todo
            var cookies = core.parseCookies(req);
            var token = cookies.token;
            const form = formidable({ uploadDir: setting.downloadFolder }); // upload directory

            form.parse(req, (err, fields, files) => {
                if (err) {
                    res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
                    res.end(String(err));
                    return;
                }
                req.formData = { fields, files };
                });
            form.on('end', () => {
                console.log('Form upload complete');
                global.events.emit(token + 'form_posted_end');
            });
            return;
        } else {
            req.on('data', function (data) {
                if (req.url)
                    if (!req.formData) {
                        req.formData = Buffer.from(data); //new Buffer(data, 'utf-8');
                    }
            });
            req.on('end', function () {
                var body = req.formData.toString('utf-8');
                body = body.replace(/\+/g, ' ');
                req.formData = JSON.parse(body);
                console.log(req.formData);
            });
        }
    }
    
};

var getCallerIP = function(req) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
       return ip;
}

var defineFriendlyDate = function () {
    Date.prototype.friendlyDate = function (){
        var d = this.getDate();
        var m = this.getMonth() + 1; //Month from 0 to 11
        var y = this.getFullYear();
        var h = this.getHours();
        var mi = this.getMinutes();
        var s = this.getSeconds();
        return (d<= 9 ? '0' + d : d) + '-' + (m<=9 ? '0' + m : m) + '-' + y + ' ' +(h<=9 ? '0' + h : h) + ':' + (mi<=9 ? '0' + mi : mi) + ':' + (s<=9 ? '0' + s : s);
    }
};

var defineTokenValidation = function () {
    String.prototype.validateToken = function (){
        if (this === undefined){
            return false;
        }else if(this.length < 50 || this.length >50){
            return false;
        }
        return true;
    }
};

var defineEmailValidation = function () {
    String.prototype.validateEmail = function () {
        //var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this).toLowerCase());
    }
}

var redirect = function (res, path) {
    res.writeHead(302, {Location: path});
    res.end();
}

var parseCookies = function(request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    var cookies = cookieHeader.split(';');
    var len = cookies.length;
    for (let i = 0; i < len; i++) {
        var cookie = cookies[i];
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value); 
    }
   /*
    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });
    */

    return list;
}

var emitter_definitions = function(){
    var emitter = new events.EventEmitter();
    global.events = emitter;
};

var formatDate = function(date){
    var d = new Date(date);
    var dformat = [d.getDate(), d.getMonth()+1, d.getFullYear()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
}


var core = {
    getFolderFiles:getFolderFiles,
    formatDate:formatDate,
    parseCookies:parseCookies,
    getfileContentAsync:getfileContentAsync,
    getfileContentImgAsync:getfileContentImgAsync,
    redirect:redirect,
    queryStringToObject:queryStringToObject,
    getfileContentImg: getfileContentImg,
    getfileContent: getfileContent,
    returnFile:returnFile,
    callMethods: callMethods,
    readFile: readFile,
    getFileNames: getFileNames,
    guid: GenerateGUID,
    GenerateToken:GenerateToken,
    GeneratePassword:GeneratePassword,
    postHandler:postHandler,
    getDictionaryFormData:getDictionaryFormData,
    getCallerIP:getCallerIP,
    request: request,
    initRouter: function (cb) {
        emitter_definitions();
        loadRouteFile();
        initRouteConfigWatcher();
        defineFriendlyDate();
        defineTokenValidation();
        defineEmailValidation();
        cb && cb();
    },
    checkVirtual: function (url, cb) {
        cb && cb(url.indexOf(setting.virtualRootPath) != -1);
    },
    getExtention: function (url) {
        return (url.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
    },
    getActionName: getActionName
};
module.exports = core;
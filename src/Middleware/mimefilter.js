var core = require('./../Core');
var route = require('./../route');
var defaults = require('./../Config/Defaults/Default');
var setting = require('./../Config/setting');
var header = require('./../Middleware/header');
var Sessions = require('./../Middleware/session');
var sessionHandler = new Sessions(null, {expires: setting.sessionExpireTime});//10 mins.
var mimeRequest = {
    catchMime: function (req, res) {
        if (req.url === '/favicon.ico') {
            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });
            res.end();
            return false;
        }

        if(req.url === '/.well-known/pki-validation/2A5AD09BC6E54D82679670C955AABA1F.txt'){
            res.writeHead(200, defaults.TheHeaderTXT);
            res.write(`5ED387D2251ADD7908F4650985C43A33A307F4287825BCA166CD11079EDF0D8B
comodoca.com
8a6fc4b430ac1d5`);
            res.end();
            return;
        }

        core.checkVirtual(req.url, async function (isVirtual) {
            if (isVirtual) {
                var filePath = req.url.replace(setting.virtualRootPath, setting.rootPath);
                var ext = core.getExtention(req.url);
                switch (ext) {
                    case 'css':
                        res.writeHead(200, defaults.TheHeaderCss);
                        await core.getfileContentAsync(res, filePath);
                        break;
                    case 'js':
                        res.writeHead(200, defaults.TheHeaderJavascript);
                        await core.getfileContentAsync(res, filePath);
                        break;
                    case 'txt':
                        res.writeHead(200, defaults.TheHeaderTXT);
                        await core.getfileContentAsync(res, filePath);    
                        break;
                    case 'png':
                        res.writeHead(200, defaults.TheHeaderPNG);
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                    case 'jpeg':
                        res.writeHead(200, defaults.TheHeaderJPEG);
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                    case 'jpg':
                        res.writeHead(200, defaults.TheHeaderJPG);
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                    case '.html':
                        res.writeHead(200, defaults.TheHeaderHtml);
                        await core.getfileContentImgAsync(res, filePath);
                        break;   
                    case 'woff':
                        res.writeHead(200, defaults.TheHeaderWoff); 
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                    case 'woff2':
                        res.writeHead(200, defaults.TheHeaderWoff2);
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                    case 'pdf':
                        res.writeHead(200, defaults.TheHeaderPdf);
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                    case 'svg':
                        res.writeHead(200, defaults.TheHeaderSvg);
                        await core.getfileContentImgAsync(res, filePath);
                        break;
                }
            }
            else {
                //adding general header.
              /*  header.addHeader(res, [
                    {key: 'kings-header',value: 'kingValue'}
                ], function (resp) {
                    route.guideRequest(req, resp);
                });
                */
             
                route.guideRequest(req, res);
            

              }
        });

    }
};

module.exports = mimeRequest;
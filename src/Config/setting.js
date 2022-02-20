var settings = {
    proj: {
        Title: 'Alchem Techs'
    }
};

settings.DdosLimitOptions = {
    seconds: 60,
    requestLimit:20,
    blockSeconds: 30
};
settings.downloadFolder = '/Users/ariftunckiral/Free/alchemtechs/UI/assets/files/';
settings.tokenExpireTimeLimit = 6;
settings.superAdminGroupId = 3;
settings.cpuCount = 1;
var numCPUs = (settings.cpuCount === 0) ? require('os').cpus().length : settings.cpuCount;
console.log('running on ' + numCPUs + ' instance');
settings.root = '/UI/';
settings.rootPath = settings.root + 'assets/';
settings.viewFolder = settings.root + 'Pages/';
settings.allViewFolder = settings.root + 'Pages/views/';
settings.virtualRootPath = '/virt/';
settings.controllerFolder = './Controller/';
settings.partials= settings.root + 'Pages/Partials/';
settings.jsonPath = "/src/Config/Routes.json";
settings.errorController = './Controller/error';
settings.ServerPort = process.env.PORT || 8081;



settings.postGreDb = {
    user: 'alchemadmin',
    pass: 'alchempass',
    ip: '31.210.52.10',//desktop,mac
    port: '5432',//home, desktop, mac
    dbname: 'alchemtech'
};
settings.PostGreConnection = 'postgres://' + settings.postGreDb.user + ':' + settings.postGreDb.pass + '@' 
    + settings.postGreDb.ip + ':' + settings.postGreDb.port + '/' + settings.postGreDb.dbname ;//+ '?sslmode=yes';//+ '?sslmode=disable';
module.exports = settings;
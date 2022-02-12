var dbData = require('./../Data/dataGroupManager'),
    workerThread = require('worker_threads');

var scheduler ={
    run: function () {
        dbData.getAllTables(function (result) {

        });
    },
    workThreads: function (name) {

    }
};
module.exports =scheduler;
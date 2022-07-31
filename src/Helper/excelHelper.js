var ExcelJS = require('exceljs');
const setting  = require('./../Config/setting');
// Reading our test file

let excelHelper = {
    GenerateExcelFile: function (filename, sheetName, data, cb) {
        var workbook = new ExcelJS.Workbook();
        var keyFields = [];
        for (var key in data[0]) {
            keyFields.push(key);
        }
        var worksheet = workbook.addWorksheet(sheetName);

        worksheet.state = 'visible';
        worksheet.columns = [];

        //this sets header values
        worksheet.addRows([keyFields]);

        //this sets column values
        var rows = [];
        for (var i = 0; i < data.length; i++) {
            var rowData = data[i];
            var theRow = [];
            for (prop in rowData) {
                theRow.push(rowData[prop]);
            }
            rows.push(theRow);
        }
        worksheet.addRows(rows);

        var xlsFilename = setting.downloadFolder + filename;

        workbook.xlsx.writeFile(xlsFilename)
            .then(function () {
                cb && cb(undefined, xlsFilename);
            }).catch(function (reason) {
                cb(reason.message);
                console.log(reason.message);

        });
    },
    GenerateExcelFileAsync : function(filename, sheetName, data){
        return new Promise((resolve, reject)=>{
            excelHelper.GenerateExcelFile (filename, sheetName, data, function (err, result) {
                resolve(result);
            });
        });
    }
};

module.exports = excelHelper;

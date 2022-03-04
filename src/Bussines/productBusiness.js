const core = require('../Core');
var data_product = require('./../Data/Products/products');
var fs = require('fs');

var bussines_product= {
    ins_update_product: function (data, cb, cbErr) {
        var tmp_data = {};
        
        if(data.files.image != undefined){
            fs.renameSync(data.files.image.filepath, data.files.image.filepath + '.jpg');
            tmp_data.image = 'files/' + data.files.image.newFilename + '.jpg';
            console.log("image", tmp_data.image);
        }
        
        if(data.files.filePath != undefined){
            fs.renameSync(data.files.filePath.filepath, data.files.filePath.filepath + '.pdf');
            tmp_data.filePath = 'files/' + data.files.filePath.newFilename + '.pdf';
            console.log("filePath", tmp_data.filePath);
        }
        //data.name, data.createdAt, data.status, data.filePath, data.image
        tmp_data.id = data.fields.id == '' ? 0 : Number(data.fields.id);
        tmp_data.name = data.fields.name;
        tmp_data.createdAt = new Date();
        tmp_data.status = data.fields.status;

        console.log("tmp_data", tmp_data);

        data_product.ins_update_product(tmp_data, 
            function (result) {
                cb && cb(result);
            }, 
            function (err) {
                cbErr && cbErr(err);
            });
    }
};

module.exports = bussines_product;
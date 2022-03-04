const core = require('../Core');
var data_product = require('./../Data/Products/products');
var fs = require('fs');

var bussines_product = {
    getProduct: function (id, cb, cbErr) {
        data_product.getproduct(id, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    ins_update_product: async function (data, cb, cbErr) {
        try {
            var tmp_data = {};
            tmp_data.Id = data.fields.Id == '' ? 0 : Number(data.fields.Id);
           
            if (tmp_data.Id != 0) {
                tmp_data =  await bussines_product.async.getProduct(tmp_data.Id);
                if(tmp_data.length == 0){
                    tmp_data.Id = 0;
                }else{
                    tmp_data = tmp_data[0];
                }
            }
            
            if (data.files.image != undefined) {
                if(data.files.image.size > 0){
                    fs.renameSync(data.files.image.filepath, data.files.image.filepath + '.jpg');
                    tmp_data.image = 'files/' + data.files.image.newFilename + '.jpg';
                    console.log("image", tmp_data.image);
                }
            }

            if (data.files.FilePath != undefined) {
                if(data.files.FilePath.size > 0){
                    fs.renameSync(data.files.FilePath.filepath, data.files.FilePath.filepath + '.pdf');
                    tmp_data.FilePath = 'files/' + data.files.FilePath.newFilename + '.pdf';
                    console.log("filePath", tmp_data.filePath);
                }
            }
            
            tmp_data.Name = data.fields.Name;
            if (tmp_data.Id == 0) {
                tmp_data.CreatedAt = new Date();
            }
            tmp_data.Status = data.fields.Status;

            console.log("tmp_data", tmp_data);

            data_product.ins_update_product(tmp_data,
                function (result) {
                    cb && cb(result);
                },
                function (err) {
                    cbErr && cbErr(err);
                });
        } catch (error) {
            console.log(error);
        }
    },
    async: {
        getProduct: function (id) {
            return new Promise(function (resolve, reject) {
                bussines_product.getProduct(id, function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        }
    }
};

module.exports = bussines_product;
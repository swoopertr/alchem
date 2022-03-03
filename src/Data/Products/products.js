var pg = require('./../Repository/postgre');


var workDefinition = {
    getproducts: function (cb, cbErr) {
        const query = {
            text: 'select * from public."Products"',
            values: [],
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    ins_update_product: function (data, cb, cbErr) {
        let query;
        if (data.id == "0") { //insert
            query = { 
                text: 'INSERT INTO public."Products"("Name", "CreatedAt", "Status", "FilePath", image) VALUES ( $1, $2, $3, $4, $5) RETURNING "Id";',
                values: [data.name, data.createdAt, data.status, data.filePath, data.image]
            };
        }else{ //update
            query = {
                text: 'UPDATE public."Products" SET "Name" = $2, "Status" = $3, "FilePath" = $4, image = $5 WHERE "Id" = $1;',
                values: [data.id, data.name, data.status, data.filePath, data.image]
            };
        }
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: { // async versions of the above
        getproducts: function () {
            return new Promise(function (resolve, reject) {
                workDefinition.getproducts(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(err);
                });
            });
        },
        ins_update_product: function (data) {
            return new Promise(function (resolve, reject) {
                workDefinition.ins_update_product(data,
                    function (result) {
                        resolve(result);
                    },
                    function (err) {
                        reject(err);
                    });
            });
        }
    }
};

module.exports = workDefinition;
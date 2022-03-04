var pg = require('./../Repository/postgre');


var workDefinition = {
    getproduct: function (id, cb, cbErr) {
        const query = {
            text: 'select * from public."Products" where "Id" = $1',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
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
        try {
    
        let query;
        if (data.Id == "0") { //insert
            query = { 
                text: 'INSERT INTO public."Products"("Name", "CreatedAt", "Status", "FilePath", image) VALUES ( $1, $2, $3, $4, $5) RETURNING "Id";',
                values: [data.name, data.createdAt, data.status, data.filePath, data.image]
            };
        }else{ //update
            query = {
                text: 'UPDATE public."Products" SET "Name" = $2, "Status" = $3, "FilePath" = $4, image = $5 WHERE "Id" = $1;',
                values: [data.Id, data.Name, data.Status, data.FilePath, data.image]
            };
        }
        pg.query(query, function (result) {
            console.log("result", result);
            cb && cb(result);
        }, function (err) {
            console.log(err);
            cbErr && cbErr(err);
        });
    } catch (error) {
        console.log(error);
    }
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
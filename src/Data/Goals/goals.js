var pg = require('./../Repository/postgre');


var workDefinition = {
    
    getGoals: function (cb, cbErr) {
        const query = {
            text: 'select * from public."Goals" ',
            values: []
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: { // async versions of the above functions
     
    }
};

module.exports = workDefinition;
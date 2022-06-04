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
    getAllAppointedGoals: function (cb, cbErr) {
        const query = {
            text: `select g."Id", u."Name" Atayan, P."Name", g."GoalCount", g."StartDate", g."EndDate", g."Description", g."Title" from "Goals" g
            inner join "Users" u on u."Id"= g."Appointer"
            inner join "Pharmacies" P on P."Id" = g."UserId"
        where g."Status" in (1,2)`,
            values: []
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    
    },
    deleteGoal: function (id, cb) {
        const query = { 
            text: `
            update "Goals" set "Status" = 3 where "Id"= $1;`,
            values: [id]
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
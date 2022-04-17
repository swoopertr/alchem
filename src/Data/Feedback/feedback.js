var pg =  require('../Repository/postgre');

var workDefinition = {
    add_feedback: function(data, cb){
        const query = {
            text: `insert into "Feedbacks" ( "Topic", "Description") values ($1, $2);`,
            values: [data.topic, data.description]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cb && cb(err);
        });
    }
};

module.exports = workDefinition;
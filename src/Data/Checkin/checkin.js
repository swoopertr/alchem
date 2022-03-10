var pg =  require('../Repository/postgre');

var workDefinition = { 
    saveCheckin: function(checkin, cb){
        const query = { 
            text: `insert into "CheckIns" ("UserId", "PhrmacyId", "lat", "lng")
                                   values ($1      , $2         ,  $3  , $4) RETURNING "Id" ;`, 
            values: [
                checkin.UserId,     // 1
                checkin.PharmacyId, // 2
                checkin.lat,        // 3
                checkin.lng,        // 4
            ]
        };
        pg.query(query, function (result) {
            cb && cb(result[0].Id);
        });
    }
 };

module.exports = workDefinition;
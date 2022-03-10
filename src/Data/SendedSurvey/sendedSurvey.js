var pg = require('./../Repository/postgre');

var survey_send= {
    insert : function (surveyToSend, cb, cbErr) {
        //insert into "SendedSurveys" ("SurveyId", "ExpiredAt", "UniqueValue", "LastAnsweredQuestion", "IsStarted", "IsFinised", "PharmacyId")
        //values ();
        try {
            let query = {
                text: `insert into "SendedSurveys" ("SurveyId", "ExpiredAt", "UniqueValue", "LastAnsweredQuestion", "IsStarted", "IsFinised", "PharmacyId", "CreatedBy")
                                            values ($1,         $2,          $3,            0,                     0,            0,           $4,           $5) returning "Id"`,
                values: [
                    surveyToSend.surveyId, 
                    surveyToSend.expiredAt, 
                    surveyToSend.uniqueValue,
                    surveyToSend.PharmacyId,
                    surveyToSend.userId
                ]
            };
        
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
    get_sended_survey_by_id : function (id, cb, cbErr) {
        try {
            let query = {
                text: `select * from "SendedSurveys" where "UniqueValue" = $1`,
                values: [id]
            };
        
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
    }
};

module.exports = survey_send;
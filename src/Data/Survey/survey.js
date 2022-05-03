var pg = require('./../Repository/postgre');

var survey_data= {
    get_survey_by_productId : function(id, cb, cbErr){
        const query = {
            text: 'select * from public."Survey" where "ProductId" = $1',
            values: [id]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    update_survey : async function(data, cb, cbErr){
        let product_survey = await survey_data.async.get_survey_by_productId(data.productId);
        let query;
        if(product_survey.length > 0){ // make update
            query = {
                text: `update "Survey" set "Name" = $1, "Status" = $2 where "ProductId" = $3;`,
                values: [data.surveyName, data.surveyStatus, data.productId]
            };
        } else { // make insert
            query = {
                text: `insert into "Survey" ("Name", "Status", "ProductId") values ($1, $2, $3);`,
                values: [data.surveyName, data.surveyStatus, data.productId]
            };
        }

        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    get_survey_questions: function(surveyId, cb, cbErr){
        const query = {
            text: 'select sq.* from "SurveyQuestions" sq inner join "Survey" s on sq."SurveyId" = s."ProductId" where s."Id"= $1',
            values: [surveyId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    get_surveys_by_pharmacy_id: function(pharmacyId, cb, cbErr){
        const query = {
            text: 'select s."Name" surveyname, ss.* from "SendedSurveys" ss inner join "Survey" s on s."Id" =ss."SurveyId" where "PharmacyId" = $1 order by "ExpiredAt" desc', 
            values: [pharmacyId]
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    get_surveys_score_bySendedSurveyIDs: function(sendedSurveyIds, cb){
        let ids = sendedSurveyIds.join(',');
        const query = {
            text: `select sum(sqo."IsCorrect"), "SendedSurveyId"  from "SurveyAnswers" sa
                        inner join "SurveyQuestions" sq on sa."QuestionId" = sq."Id"
                        inner join "SurveyQuestionsOptions" sqo on sqo."Id" = sa."OptionId"
                    where "SendedSurveyId" in (${ids})
                    group by "SendedSurveyId";`, 
            values: []
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    async: {
        get_survey_by_productId : function(id){
            return new Promise(function(resolve,reject){
                survey_data.get_survey_by_productId(id,function(result){
                    resolve(result);
                },function(err){
                    reject(err);
                });
            });
        },
        get_survey_questions: function(surveyId){
            return new Promise(function(resolve,reject){
                survey_data.get_survey_questions(surveyId, function(result){
                    resolve(result);
                },function(err){
                    reject(err);
                });
            });
        },
        get_surveys_by_pharmacy_id: function(pharmacyId){
            return new Promise(function(resolve,reject){
                survey_data.get_surveys_by_pharmacy_id(pharmacyId, function(result){
                    resolve(result);
                },function(err){
                    reject(err);
                });
            });
        }
    }
};

module.exports = survey_data;
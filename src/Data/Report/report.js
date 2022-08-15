var pg = require('./../Repository/postgre');


var workReport = {
    getAnswerReport: function (cb, cbErr) {
        const query = {
            text: `
            select s."Name" as Urun,
                    p."Name" as Teknisyen,
                    (select count(*) from "SurveyQuestions" where "SurveyId" = s."ProductId") as QuestionCount,
                    (select count(*) from "SurveyAnswers" sa
                inner join "SurveyQuestionsOptions" sqo on sa."OptionId" = sqo."Id"
                where "SendedSurveyId" = ss."Id" and sqo."IsCorrect" = 1) as "CorrectAnswerCount",
                    (select sa."CreatedAt" from "SurveyAnswers" sa
                inner join "SurveyQuestionsOptions" sqo on sa."OptionId" = sqo."Id"
                where "SendedSurveyId" = ss."Id" limit 1),
                U."Name",
                ss."CreatedAt" as "StartedDate"
                    from "SendedSurveys" ss
                inner join "Survey" s on ss."SurveyId" = s."Id"
                inner join "Pharmacies" p on ss."PharmacyId" = p."Id"
                inner join "Users" U on ss."CreatedBy" = U."Id"
            where ss."IsFinised" = 1`,
            values: []
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    },
    getCheckinReport: function (cb, cbErr) {
        const query = {
            text: `select c."CreatedAt", p."Name" as "Eczane", u."Name" as "Fud", c."lat", c."lng" from "CheckIns" c
    inner join "Pharmacies" p on p."Id" =c."PhrmacyId"
    inner join "Users" u on u."Id" = c."UserId"`,
            values: []
        };
        pg.query(query, function (result) {
            cb && cb(result);
        }, function (err) {
            cbErr && cbErr(err);
        });
    }
};

module.exports = workReport;
const core = require('../Core');
var pharmacyData = require('./../Data/Pharmacy/pharmacy');
var surveysData = require('./../Data/Survey/survey');
var feedbackData = require('./../Data/Feedback/feedback');
var userData = require('./../Data/Users/users');
var mail_helper = require('./../Helper/mailHelper');


let pharmacyBusiness = {
    login: function (email, pass, cb) {
        pharmacyData.getPharmacyByEmailPassword(email, pass, function (result) {
            
            let token = core.GenerateToken();
            let data = {};
            if (result.length != 0) {
                data = result[0];
                data.token = token;
            }
            pharmacyData.updateToken(data, function (result) {
                cb && cb(data);
            });
        });
    },
    checkToken: function (token, cb) {
        pharmacyData.getPharmacyByToken(token, function (result) {
            cb && cb(result);
        });
    },
    getAllSurveysByPharmacyId: function (pharmacyId, cb) {
        surveysData.get_surveys_by_pharmacy_id(pharmacyId, function (result) {
            for (let i = 0; i < result.length; i++) {
                result[i].ExpiredAt = result[i].ExpiredAt.getTime();
            }
            cb && cb(result);
        });
    },
    addFeedback :  function(data, cb){
        feedbackData.add_feedback(data, async function(result){
            let adminUsers = await userData.async.getAllAdminsEmailsAsync();
            let adminsEmail = adminUsers.map(x => x.email);
            let body = 'Başlik : '+ data.topic + '<br>' + 'Mesaj : ' + data.description;
            await mail_helper.send_mail_async(adminsEmail, 'AlchemLife Eğitim Geribildirim', body);
            cb && cb(result);
        });
    },
    calculatePoints : function(pharmacyId, cb){
        surveysData.get_surveys_by_pharmacy_id(pharmacyId, async function(result){
            cb && cb(result);
        });
    }
};

module.exports = pharmacyBusiness;
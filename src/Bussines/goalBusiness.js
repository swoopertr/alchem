const core = require('../Core');
var goalsData = require('./../Data/Goals/goals');
var mail_helper = require('./../Helper/mailHelper');

let goals_business = {
    getAllPharmacies: function (cb) {
        pharmacyData.getPharmacies(function (result) {
            cb && cb(result);
        });
    }
};

module.exports = goals_business;
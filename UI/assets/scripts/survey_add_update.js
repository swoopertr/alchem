console.log("survey_add_update.js");
userPageType = 1;
check_login();

(function() {
    $('#upd_ins_survey').click(function() {
        upd_ins_survey();
    });
    
    function upd_ins_survey() {
        var productId = $('#productId').val(); 
        var surveyName = $('#SurveyName').val();
        var surveyStatus = $('#status').val();
        
        console.log("upd_ins_survey");
        console.log("productId: " + productId);
        console.log("SurveyName: " + surveyName);
        console.log("status: " + surveyStatus);

        var data = {
            productId: productId,
            surveyName: surveyName,
            surveyStatus: surveyStatus
        };
        util.postJsonRequest('/admin/survey_add', data, undefined, function (result) {
            if (result == 1){
                alert('Güncellendi');
            }
            console.log('Güncellendi')
        });
    }
})();
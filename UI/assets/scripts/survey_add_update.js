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
        util.postJsonRequest('login_post', data, undefined, function (result) {
            result= JSON.parse(result);
            util.cookie.add('token', result.token);
            util.cookie.add('userName', result.userName);
            util.cookie.add('email', result.email);
            util.cookie.add('usertype', result.type);
            
            if (result.type == 1) {
                window.location.href = '/admin';
            } else if (result.type == 2) {
                window.location.href = '/fud';
            }
            console.log(result);
        });


    }

})();
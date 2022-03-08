console.log("admin_survey_question_update.js");
userPageType = 1;
check_login();

(function() {
    var question = $('#question').val();
    var surveyId = $('#surveyId').val();


    
    var data = {
        question: question,
        surveyId: surveyId
    };
    util.postJsonRequest('/admin/survey/guncelle_post', data, undefined, function (result) {
        if (result == 1){
            alert('Güncellendi');
            window.location.href = 'admin/urun-anket-ekle?id=' + surveyId;
        }else{
            console.log('hata');
            console.log(result);
        }
        //console.log('Güncellendi')
    });
})();

console.log("admin_survey_question_update.js");
userPageType = 1;
check_login();

(function() {


    document.getElementById('btnUpdSave').addEventListener('click', function() {
        console.log('clicked');
        updatePost();
    });
    

function updatePost(){
    var question = $('#question').val();
    var surveyId = $('#surveyId').val();

    var data = {
        question: question,
        surveyId: surveyId
    };
    util.postJsonRequest('/admin/survey/guncelle_post', data, undefined, function (result) {
        if (result == "[]"){
            alert('Güncellendi');
            window.location.href = '/admin/survey/questions?id=' + surveyId;
        }else{
            console.log('hata');
            console.log(result);
        }
        //console.log('Güncellendi')
    });
}

    
})();

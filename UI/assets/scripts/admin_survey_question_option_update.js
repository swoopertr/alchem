console.log('admin_survey_question_option_update.js');
userPageType = 1;
check_login();

(function() {
    
    document.getElementById('btnUpdSave').addEventListener('click', function() {
        console.log('btnUpdSave');
        update(function () {
            var qs = util.qsObject();
            var surveyId = qs.surveyId;
            console.log('admin/survey/questions?id='+surveyId);    
            window.location.href = '/admin/survey/questions?id='+surveyId;
        });
    });

    function update(cb){
        var qs = util.qsObject();
        var surveyId = qs.surveyId;
        var questionId = qs.questionId;
        var question = $('#question').val();

        var data = {
            surveyId: surveyId,
            questionId: questionId=="0"? undefined : questionId,
            question: question,
        };

        util.postJsonRequest('/admin/survey/guncelle_post', data, undefined, function(result){
            console.log('success');
            console.log(result);
            cb && cb();
        });

    }

})();
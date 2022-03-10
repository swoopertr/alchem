console.log('admin_survey_question_option_page.js');
userPageType = 1;
check_login();

(function() {
    var qs = util.qsObject();
    var surveyId = qs.surveyId;
    var questionId = qs.questionId;

     document.getElementById('btnUpdSave').addEventListener('click', function() {
         console.log('btnUpdSave');
         update(function(){
             window.location.href = '/admin/survey/questions?id='+surveyId;
         });
     });



    function update(cb){

        //'admin/survey/questions?id=15'
        var doms = $('.values');
        var options = [];
        for(var i=0; i<doms.length; i++){
            var value = doms[i].value;
            var boolCheck = $(doms[i]).parent().find('.optionRadio').prop("checked");
            
            options.push({
                question: value,
                isCorrect: boolCheck
            });
        }

        console.log(options);

        var data = {
            questionId,
            options
        };
        util.postJsonRequest('/admin/survey/answer/post', data, undefined, function(result){
            console.log(result);
            cb && cb();
        });
        
    }
})();

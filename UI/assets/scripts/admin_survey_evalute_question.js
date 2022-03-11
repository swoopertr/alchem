console.log('admin_survey_evalute_question.js');

(function() {

    //$("input[name]:checked");

    $(".optionRadio").change(function(){
        checkForAnsweredQuestionCount();
    });

    document.getElementById('btnUpdSave').addEventListener('click', function(e) {
        sendAnswers(function(){
            alert('Sorulara verdiğiniz cevaplar elimize ulaşmıştır, \nAlchemLife eğitimlerine katıldığınız için teşekkür ederiz.');
            window.location.href = 'https://www.alchemlife.com.tr';
        });
        
    });

    function checkForAnsweredQuestionCount() {
        if($("input[name]:checked").length == $(".card-title").length) {
            document.getElementById('btnUpdSave').disabled = false;
        }
    }

    function sendAnswers(cb){
        var obj = $("input[name]:checked");
        var arr = [];
        var sendedId = document.getElementById('btnUpdSave').getAttribute('data-sended-id');
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            let QuestionId = item.getAttribute('data-question-id'); 
            let OptionId = item.getAttribute('data-option-id');

            arr.push({
                QuestionId,
                OptionId,
                SendedSurveyId : sendedId
            });

        }
    
        console.log(arr);
        util.postJsonRequest('/surveySaveAnswer',arr, undefined, function(result){
            cb && cb();
        });
    }



})();

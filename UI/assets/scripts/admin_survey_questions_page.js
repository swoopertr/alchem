console.log('admin_survey_questions_page.js');
userPageType = 2;
check_login();

(function() {
      
    $('.delete_question').click(function() {
        var questionId = $(this).attr('data-id');
        console.log('delete_question: ' + questionId);
        delete_question(questionId);
    });

    function delete_question (questionId){
        console.log('delete_question: ' + questionId);
        var confirmDelete = confirm('Bu soru silinecek. Emin misiniz?');
        if(confirmDelete){
            util.postJsonRequest('/admin/survey/questiondelete', {questionId: questionId}, undefined, function (result) {
                if (result == 1){
                    alert('Soru silindi');
                    window.location.reload();
                }
            });
        }
        
    }
    
})();

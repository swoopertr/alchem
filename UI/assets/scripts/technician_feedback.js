console.log('technician_feedback.js');
userPageType = 3;
check_exlogin();

(function() {
    var btnSave = util.selectDom('#btnSave');
    btnSave.addEventListener('click', function() {

        var data = {
            topic: util.selectDom('#topic').value,
            description: util.selectDom('#description').value,
        };


        util.postJsonRequest('/feedback_post', data, undefined, function (result) {
            if (JSON.parse(result).status == "success") {
                alert('Geribildirim gönderildi');
                util.selectDom('#description').value = '';
                util.selectDom('#topic').value = '';
                window.location.reload();
            }
        });
    });
})();
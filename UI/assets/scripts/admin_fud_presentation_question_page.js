console.log('admin_fud_presentation_question_page.js');
userPageType = 2;
check_login();

(function () {


    document.getElementById('btnGenerateLink').addEventListener('click', function (e) {
        e.preventDefault();
        generateLink(function (result) {
            console.log(result);
            document.getElementById('urlTxt').value = 'http://alchemlifeegitim.com/survey/evaluate?id=' + JSON.parse(result).uniqueValue;
        })
    });

    document.getElementById('btnSendMail').addEventListener('click', function (e) {
        alert('Mail Gönderildi');
    });

    document.getElementById('btnCopy').addEventListener('click', function (e) {
        navigator.clipboard.writeText(document.getElementById('urlTxt').value);
    });

    function generateLink(cb) {
        
        
        var post_obj = {
            PharmacyId : util.cookie.get("selected_pharmacy")
        };
        console.log({
            post_obj
        });

        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];

        util.postJsonRequest('/fud/generatetoken?id='+util.qsObject().id, post_obj, check_obj, function (result) {
            if (result != "0") {
                util.cookie.add("selected_pharmacy", post_obj.PharmacyId, 1440);
                cb && cb(result);
            } 
        });
    }

})();
console.log('admin_fud_presentation_question_page.js');
userPageType = 2;
check_login();

(function () {

    document.getElementById('btnGenerateLink').addEventListener('click', function (e) {
        e.preventDefault();
        generateLink(function (result) {
            //console.log(result);
            result = JSON.parse(result).result_links;
            let html_links = '<ul>';
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                html_links +='<li style="padding: 5px;">'+ element.technicianName + ' - https://alchemlifeegitim.com/survey/evaluate?id=' + element.uniqueValue + '</li>';
            }
            html_links += '<ul>';
            $('#links').html(html_links);
        })
    });

    /* document.getElementById('btnSendMail').addEventListener('click', function (e) {
        e.preventDefault();
        sendEmail( document.getElementById('urlTxt').value, pharmacy.email ,function (result) {
            console.log(result);
            alert('Olusturulan linki mail adresinize gonderdik.');
        });
    });
 */
   /*  document.getElementById('btnCopy').addEventListener('click', function (e) {
        navigator.clipboard.writeText(document.getElementById('urlTxt').value);
    }); */

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

    function sendEmail(link, to, cb){
        util.postJsonRequest('/fud/sendmail', {url: link, to: pharmacy.email} , [], function (result) {
            cb && cb(result);
        });
        
    }

})();
console.log('fud_pharmacy_list_page.js');
userPageType = 2;
check_login();

(function (params) {
    util.event.bindLive('.delTechnician', 'click', function (e) {
        e.preventDefault();
        var isOk = confirm('Son kararın mı? siliyorum...!!!');
        if(isOk){
            var id= e.target.getAttribute('data-id');
            deleteTech(id);
        }
        
    });


    function deleteTech(id){
        
        
        var post_obj = {
            Id:id
        };
        
        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];

        util.postJsonRequest('/fud/delete_technician', post_obj, check_obj, function (result) {
            document.location.reload(); 
        });
    }

})();

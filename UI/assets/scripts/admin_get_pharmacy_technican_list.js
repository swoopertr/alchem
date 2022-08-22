console.log('admin_get_pharmacy_technican_list');
userPageType = 1;
check_login();

(function () {
    util.event.bindLive('.deleteTechnician', 'click', function(e){
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

        util.postJsonRequest('/admin/delete_technician', post_obj, check_obj, function (result) {
            document.location.reload(); 
        });
    }

})();
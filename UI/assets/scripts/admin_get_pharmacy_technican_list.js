console.log('admin_get_pharmacy_technican_list');
userPageType = 1;
check_login();

(function () {
    util.event.bindLive('.deleteTechnician', 'click', function(e){
        e.preventDefault();
        var id= e.target.getAttribute('data-id');
        console.log(id);
        //deleteTech(id);
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

        util.postJsonRequest('/fud/upsert_technician', post_obj, check_obj, function (result) {
            if (JSON.parse(result).status == "success") {
                var pharmacyId = $('#PharmacyId').val();
                document.location.href= '/getpharmacytech?id='+pharmacyId;
            }
        });
    }

})();
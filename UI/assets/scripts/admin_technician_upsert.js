console.log('admin_technician_upsert.js');
userPageType = 1;
check_login();

(function () {


    document.getElementById('btnUpdateTechnician').addEventListener('click', function (e) {
       updatePharmacy(); 
    });

    function updatePharmacy() {
        var Id = $('#Id').val();
        var nameSurName = $('#nameSurname').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var PharmacyId = $('#PharmacyId').val();
        var status = $('#status').val();
        
        var post_obj = {
            Id,
            nameSurName,
            phone,
            email,
            PharmacyId,
            status
        };
        
        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];

        util.postJsonRequest('/admin/upsert_technician_admin', post_obj, check_obj, function (result) {
            if (JSON.parse(result).status == "success") {
                var pharmacyId = $('#PharmacyId').val();
                document.location.href= '/admin_pharmacy_technicians?id='+pharmacyId;
            }
        });
    }

})();
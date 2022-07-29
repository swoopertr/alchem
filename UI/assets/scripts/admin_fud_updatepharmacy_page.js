console.log('admin_fud_savepharmacy_page.js');
userPageType = 1;
check_login();

(function () {

    document.getElementById('btnUpdatePharmacy').addEventListener('click', function (e) {
        e.preventDefault();
        updatePharmacy(function(result){
            if(result != "0") {
                alert('Kayıt işlemi başarılı. Anasayfaya yönlendiriliyorsunuz.');
                window.location.href = '/admin/pharmacy-list';
            }
        });
    });

    document.getElementById('btnSendPassword').addEventListener('click', function (e) {
        sendPasswordEmail(function(result){ 
            alert(result);
        });
    });

    function sendPasswordEmail(cb){
        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];
        var post_obj = {
            id: $('#Id').val()
        };

        util.postJsonRequest('/admin/sendpharmacypasswordmail', post_obj, check_obj, function (result) {
            if (result != "0") {
                cb && cb(result);
            } 
        });
    }

    function updatePharmacy(cb) {
        var Id = $('#Id').val();
        var pharmacyName = $('#pharmacyName').val();
        var nameSurname = $('#nameSurname').val();
        var gsm = $('#gsm').val();
        var officePhone = $('#officePhone').val();
        var email = $('#email').val();
        var glnCode = $('#glnCode').val();
        var country = $('#country').val();
        var city = $('#city').val();
        var street = $('#street').val();
        var town = $('#town').val();
        var coordinate = $('#coordinate').val();
        var quarter = $('#quarter').val();
        var status = $('#status').val();
        var password = $('#password').val();
        var technician = $('#nameTechnician').val();

        var coordinates = coordinate.split(',');
        var lat = coordinates[0];
        var lng = coordinates[1];
        var post_obj = {
            Id,
            pharmacyName,
            nameSurname,
            officePhone,
            status,
            gsm,
            lng,
            lat,
            email,
            glnCode,
            country,
            city,
            town,
            street,
            quarter,
            password,
            technician
        };
        
        console.log({
            post_obj
        });

        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];

        util.postJsonRequest('/admin/updatepharmacy', post_obj, check_obj, function (result) {
            if (result != "0") {
                cb && cb(result);
            } 
        });
    }

})();
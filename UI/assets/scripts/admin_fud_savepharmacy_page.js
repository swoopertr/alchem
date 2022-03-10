console.log('admin_fud_savepharmacy_page.js');
userPageType = 2;
check_login();

(function () {

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            
        } else {
            document.getElementById('btnCheckin').disabled = true;
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        console.log(position.coords.latitude + ", " + position.coords.longitude);
        document.getElementById('coordinate').value = position.coords.latitude + "," + position.coords.longitude;
    }
    getLocation();

    document.getElementById('btnCheckin').addEventListener('click', function (e) {
        e.preventDefault();
        savePharmacy(function(result){
            if(result != "0") {
                alert('Kayıt işlemi başarılı. Anasayfaya yönlendiriliyorsunuz.');
                window.location.href = '/fud';
            }
        });
    });

    function savePharmacy(cb) {

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
        var town = $('#town').val();

        var coordinates = coordinate.split(',');
        var lat = coordinates[0];
        var lng = coordinates[1];
        var post_obj = {
            pharmacyName,
            nameSurname,
            officePhone,
            gsm,
            lng,
            lat,
            email,
            glnCode,
            country,
            city,
            town,
            street
        };
        console.log({
            post_obj
        });

        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];

        util.postJsonRequest('/fud/savepharmacy', post_obj, check_obj, function (result) {
            if (result != "0") {
                cb && cb(result);
            } 
        });
    }

})();
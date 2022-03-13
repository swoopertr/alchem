console.log('admin_fud_savepharmacy_page.js');
userPageType = 2;
check_login();

(function () {

    function getLocation() {
        //document.getElementById('coordinate').value = "40.54345,30.21445";
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
        //document.getElementById('coordinate').value = "40.54345,30.21445";
    }
    getLocation();

    document.getElementById('btnCheckin').addEventListener('click', function (e) {
        e.preventDefault();
        if(document.getElementById('coordinate').value == ""){
            alert('koordinat için izin veriniz')
        }else{
            var PharmacyId = $('#pharmacies').val();
            if(PharmacyId == ''){
                alert('Eczane seçiniz');
            }else{
                saveCheckin(function(result){
                    if(result != "0") {
                        alert('Check in success');
                        document.getElementById('btnCheckin').disabled = true;
                        document.getElementById('btnGoPresent').disabled = false;
                    }
                });
            }
            
        }
        
    });

    document.getElementById('btnGoPresent').addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = "/fud/urunler";
    });

    function saveCheckin(cb) {
        var PharmacyId = $('#pharmacies').val();
        var coordinate = $('#coordinate').val();
        var coordinates = coordinate.split(',');
        
        var lat = coordinates[0];
        var lng = coordinates[1];
        var post_obj = {
            PharmacyId,
            lng,
            lat
        };
        console.log({
            post_obj
        });

        var token = util.cookie.get('token');
        var check_obj = [
            { name: 'token',  value: token },
            { name: 'userPageType',  value: userPageType }
        ];

        util.postJsonRequest('/fud/savecheckin', post_obj, check_obj, function (result) {
            if (result != "0") {
                util.cookie.add("selected_pharmacy", PharmacyId, 1440);
                cb && cb(result);
            } 
        });
    }

})();
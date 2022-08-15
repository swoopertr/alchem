console.log('admin_fud_guncelle.js');
userPageType = 1;
check_login();

(function() {
    //todo post data
    $(document).ready(function(){

        //check if loaded with querystring id

        
        $('#btnFudAdd').click(function(){
            
            var fud_id = $('#fudId').val();
            var fud_name = $('#FudName').val();
            var fud_email = $('#Email').val();
            var pass = $('#password').val();
            var phone = $('#phone').val();
            var status = $('[name="selectStatus"]').val();
            var region = $('[name="selectRegion"]').val();

            var post_obj = {
                id: (fud_id == "") ? 0 : fud_id,
                name: fud_name,
                email: fud_email,
                password: pass,
                phone: phone,
                status: status,
                region:region
            };
            console.log({post_obj});
            

            var token = util.cookie.get('token');
            var check_obj  = [
                { name : 'token',         value : token },
                { name : 'userPageType',  value : userPageType}
            ];

            util.postJsonRequest('/admin/fud-ekle',post_obj, check_obj, function(result){
                if(JSON.parse(result).hasOwnProperty('status')){
                    alert('Başarılı bir şekilde kayıt yapıldı');
                    window.location.href = '/admin/fud-listesi';
                }else{
                    console.log(result);    
                }
            });

        });
    });

})();

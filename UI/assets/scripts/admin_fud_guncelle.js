console.log('admin_fud_guncelle.js');
userPageType = 1;
check_login();

(function() {
    //todo post data
    $(document).ready(function(){


        $('#btnFudAdd').click(function(){
            
            
            var fud_id = $('#fudId').val();
            var fud_name = $('#FudName').val();
            var fud_email = $('#Email').val();
            var pass = $('#password').val();
            var phone = $('#phone').val();

            var post_obj = {
                id: fud_id,
                name: fud_name,
                email: fud_email,
                password: pass,
                phone: phone             
            };
            console.log({post_obj});
            
            var token = util.cookie.get('token');
            var check_obj  = [
                { name : 'token',         value : token },
                { name : 'userPageType',  value : userPageType}
            ];

            util.postJsonRequest('/admin/fud-ekle',post_obj, check_obj, function(result){
                console.log(result);
            });

        });
    });

})();

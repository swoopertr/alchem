console.log('admin_fud_page.js');
userPageType = 1;
check_login();

(function() {
    $('.delete_fud').click(function(){
        var fud_id = $(this).attr('data-id');
        var token = util.cookie.get('token');
        var check_obj  = [
            { name : 'token',         value : token },
            { name : 'userPageType',  value : userPageType}
        ];
        util.postJsonRequest('/admin/fud-sil',{id:fud_id}, check_obj, function(result){
            if(JSON.parse(result).status == "success"){
                window.location.href = '/admin/fud-listesi';
            }else{
                console.log(result);    
            }
        }); 
    });

    
})();

console.log('this is main.js');



(function() {
    window.check_login= function(){
        var token = util.cookie.get('token');
        var check_obj  = [
            { name : 'token',         value : token },
            { name : 'userPageType',  value : userPageType}
        ];
        util.getRequest('/checktoken', check_obj, function(result){
            result = JSON.parse(result);
            if(result.status == 'success'){
                console.log('checktoken success');
                document.getElementById('login_user_name').innerHTML = util.cookie.get('userName');
                document.getElementsByClassName('role')[0].innerHTML = userPageType == 1 ?" Yönetici" : "Füd";
                
            }else{
                console.log('checktoken fail');
                 
                util.cookie.remove('token');
                util.cookie.remove('userName');
                util.cookie.remove('email');
                util.cookie.remove('usertype');
                document.location.href = '/login';
            }
        });
    };
    

    util.event.bindLive('#btnLogout','click', function(e){
        e.preventDefault();
        
        util.cookie.remove('token');
        util.cookie.remove('userName');
        util.cookie.remove('email');
        util.cookie.remove('usertype');
      
        document.location.href = '/login';
    });


})();

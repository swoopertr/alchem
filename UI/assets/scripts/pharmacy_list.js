console.log("pharmacy_list.js");
userPageType = 1;
check_login();

(function() {
    $('.btn-delete').click(function(e){
        e.preventDefault();      
        console.log(e.target.getAttribute('data-id'));
        var id = e.target.getAttribute('data-id');
        util.postJsonRequest('/admin/delete_pharmacy', {id:id}, undefined, function (result) {
            if(JSON.parse(result).status == "success"){
                window.location.href = '/admin/pharmacy-list';
            }else{
                console.log(result);    
            }
        });
    });   
})();

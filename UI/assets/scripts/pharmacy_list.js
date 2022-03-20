console.log("pharmacy_list.js");
userPageType = 1;
check_login();

(function() {
    $('.btn-delete').click(function(e){
        e.preventDefault();      
        var isDelete = confirm('Eczane silmek istediğinize emin misiniz?');
        if(isDelete){
            var id = e.target.getAttribute('data-id');
            util.postJsonRequest('/admin/delete_pharmacy', {id:id}, undefined, function (result) {
                if(JSON.parse(result).status == "success"){
                    window.location.href = '/admin/pharmacy-list';
                }else{
                    console.log(result);    
                }
            });
        }
    });   
})();

console.log('admin_urunler_page.js');
userPageType = 1;
check_login();

(function() {
    $('.delete_product').click(function() {
        var productId =  $(this).parent().parent()[0].getAttribute('data-id');
        var confirm_to_delete = confirm('Bu ürünü silmek istediğinize emin misiniz?');
        if(confirm_to_delete) {
            delete_product(productId);
        }
        
    });


    function delete_product(productId) {
        util.getRequest('/delete_product?id=' + productId, undefined, function(result){
            if(result ==1) {
                location.reload();
            }
        });
        
    }

})();
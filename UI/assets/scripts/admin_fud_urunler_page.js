console.log('admin_urunler_page.js');
userPageType = 2;
check_login();

(function () {
    var links = document.getElementsByClassName('sendQuestion');
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-count') == "0") {
            util.hide(links[i]);
            
        }
    }
})();
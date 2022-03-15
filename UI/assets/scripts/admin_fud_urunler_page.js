console.log('admin_urunler_page.js');
userPageType = 2;
check_login();

(function () {
    var links = document.getElementsByClassName('sendQuestion');
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-count') == "0") {
            links[i].setAttribute('href', '#');
            links[i].addEventListener('click', function (e) {
                e.preventDefault();
                alert('Bu ürün için soru gönderilemez.');
            });
        }
    }
})();
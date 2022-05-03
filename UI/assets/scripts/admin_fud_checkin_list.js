console.log('admin_fud_checkin_list.js');
userPageType = 2;
check_login();

(function(){
    var elems = document.getElementsByClassName('coord');
    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', function(e){
            navigator.clipboard.writeText(e.target.textContent);
        });
    }
})();
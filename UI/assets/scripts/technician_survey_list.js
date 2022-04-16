
console.log('technician_survey_list.js');
userPageType = 3;
check_exlogin();

(function() {
    var links = util.selectDom('.survey_links');
    for(var i =  0; i < links.length; i++){
        var expDate = links[i].getAttribute('data-expired');
        if(new Date().getTime()> expDate ){
            links[i].style.display = 'none';
        }
    }
})();

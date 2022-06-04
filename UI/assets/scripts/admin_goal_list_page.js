console.log('admin_goal_list_page.js');
userPageType = 1;
check_login();

(function () {
    //delete_fud
    util.event.bindLive('.delete_fud','click', function (e) {
        e.preventDefault();
        var id = e.target.parentElement.getAttribute('data-id');
        var isDelete = confirm('Silinmesini onaylıyor musunuz?');
        if(isDelete){
            deleteGoal(id, function(result){
                document.location.reload();
            });            
        } 
    });

    
    function deleteGoal(id, cb){
        var data = {
            id: id
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/admin/delete_goal');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                cb(JSON.parse(xhr.responseText));
            } else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send(JSON.stringify(data));
    }
    
})();
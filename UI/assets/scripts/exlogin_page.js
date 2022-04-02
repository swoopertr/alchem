document.getElementById("btnLogin").onclick = function () {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("pwd")[0].value;

    var data = {
        username: username,
        password: password
    };
    util.postJsonRequest('exlogin_post', data, undefined, function (result) {
        var result = JSON.parse(result);
        
        if(result.hasOwnProperty('error')){
            document.getElementById('bgemail').style.background = 'red'
            document.getElementById('bgpass').style.background = 'red'
        }else{
            if (result.Status == 1) {
                util.cookie.add('token', result.token);
                util.cookie.add('userName', result.Name);
                util.cookie.add('email', result.email);
                util.cookie.add('usertype', 3);
                window.location.href = '/teknisyen';
            }
        } 
        console.log(result);
    });
};
document.getElementById("btnLogin").onclick = function () {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("pwd")[0].value;

    var data = {
        username: username,
        password: password
    };
    util.postJsonRequest('exlogin_post', data, undefined, function (result) {
        var result= JSON.parse(result);
        util.cookie.add('token', result.token);
        util.cookie.add('userName', result.userName);
        util.cookie.add('email', result.email);
        util.cookie.add('usertype', result.type);
        if(result.hasOwnProperty('error')){
            document.getElementById('bgemail').style.background = 'red'
            document.getElementById('bgpass').style.background = 'red'
        }else{
            if (result.Status == 1) {
                window.location.href = '/teknisyen';
            }
        } 
        console.log(result);
    });
};
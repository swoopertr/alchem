document.getElementById("btnLogin").onclick = function () {
    var username = document.getElementsByName("username")[0].value;
    var password = document.getElementsByName("pwd")[0].value;

    var data = {
        username: username,
        password: password
    };
    util.postJsonRequest('login_post', data, undefined, function (result) {
        result= JSON.parse(result);
        util.cookie.add('token', result.token);
        util.cookie.add('userName', result.userName);
        util.cookie.add('email', result.email);
        util.cookie.add('usertype', result.type);
        
        if (result.type == 1) {
            window.location.href = '/admin';
        } else if (result.type == 2) {
            window.location.href = '/fud';
        }
        console.log(result);
    });
};
const core = require('../Core');
var userData = require('./../Data/Users/users');
var dataCache = require('./../Data/Cache/dataCache');

var userBusiness = {
    getChars : function(cb){
        RaM.getChars(function(result){
            var result_data=[];

            for(var i=0;i < result.length;i++){
                result_data.push({
                    name: result[i].name,
                    image: result[i].image
                });
            }

            cb && cb(result_data);
        });
    },
    getAllUsers: function(cb){
        userData.getAll(function(result){
            cb && cb(result);
        });
    },
    login: function(username, password, cb){
        userData.getUsernameAndPassword(username, password, function(data){
            var result = {};
            if(data.length > 0){
                let user = data[0];
                result = user;
                if(user) {
                    
                    if(user.token_exp != null && user.token_exp.getTime() > new Date().getTime()){
                        cb && cb({
                            token: user.token,
                            type: user["Type"],
                            email: user["email"],
                            userName: user["Name"]
                        });
                        return;
                    }else {
                        var token = core.GenerateToken();
                        userData.updateUserToken(user.Id, token, function(result){
                            dataCache.token.add_token(token, new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),result["type"], function(){
                                cb && cb({
                                    token: token,
                                    type: user["Type"],
                                    email: user["email"],
                                    userName: user["Name"]
                                });
                            });
                        });
                        return;
                    }
                }else{
                    cb && cb({
                        status: "not_found"
                    });
                    return;
                }
            }
            cb && cb({verify: true});
            return;
        });
    },
    checkToken: function(token, cb){
        dataCache.token.check_token(token, function(data){
            cb && cb(data);
        });
    }   

};

module.exports = userBusiness;
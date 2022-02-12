var RaM  = require('./../data/ExternalApi/RickAndMorty');

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
    
};

module.exports = userBusiness;
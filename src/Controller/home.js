var render = require('./../Middleware/render');
var view = require('./../Middleware/ViewPack');
var header = require('./../Middleware/header');

var home = {
    main: function (req, res) {
        header.addHeader(res, [{key:'deneme',value:'deneme'}], function (resp) {
            
            render.renderHtml(resp, view.views["home"]["main"], {
                name: "nottebook api: Hoş geldiniz", 
                restName: "Mecidiyeköy BK",
                orderData:{
                    orderId: 1, 
                    orderName: "deneme", 
                    orderPrice: "100", 
                    orderDate: "12.12.12"
                },
                header:'<meta prop="Berkay"></meta>',
                footer:'<tag>footer</tag>'
            });
            
             
        }); 
    }
    
};
module.exports = home;
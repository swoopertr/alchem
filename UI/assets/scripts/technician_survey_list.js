
console.log('technician_survey_list.js');
userPageType = 3;
check_exlogin();
var plot;
(function() {
    var links = util.selectDom('.survey_links');
    for(var i =  0; i < links.length; i++){
        var expDate = links[i].getAttribute('data-expired');
        if(new Date().getTime()> expDate ){
            links[i].style.display = 'none';
        }
    }



    if( $('#flotPie').get(0) ) {
        var plot = $.plot('#flotPie', pie_chart_data, {
            series: {
                pie: {
                    show: true,
                    combine: {
                        color: '#999',
                        threshold: 0.1
                    }
                }
            },
            legend: {
                show: false
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        });
    }




})();
